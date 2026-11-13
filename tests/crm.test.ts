import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCrmLeadPayload, resolverDestino, sendLeadToCrm } from "@/lib/crm";
import type { LeadFormData } from "@/lib/validation";

const lead: LeadFormData = {
  nome: "Ana Souza",
  email: "ana@ex.com",
  telefone: "+5511911110001",
  empresa: "Pizzaria da Ana",
  segmento: "Pizzarias",
  faturamento: "50 mil até 80 mil",
};

const tracking = { utm_source: "google", utm_campaign: "home", fbclid: "abc" };

test("payload: campos do intake, hq, alpha-home e food", () => {
  const payload = buildCrmLeadPayload(lead, tracking, undefined);
  assert.deepEqual(payload, {
    destination: "hq",
    source: "alpha-home",
    niche: "food",
    lead_category: undefined,
    name: "Ana Souza",
    company: "Pizzaria da Ana",
    email: "ana@ex.com",
    phone: "+5511911110001",
    document: undefined,
    faturamento: "50 mil até 80 mil",
    segmento: "Pizzarias",
    utm_source: "google",
    utm_medium: undefined,
    utm_campaign: "home",
    utm_content: undefined,
    utm_term: undefined,
    fbclid: "abc",
  });
});

test("sdr_email só vai quando CRM_SDR_EMAIL existe", () => {
  assert.equal("sdr_email" in buildCrmLeadPayload(lead, {}, undefined), false);
  assert.equal(buildCrmLeadPayload(lead, {}, "sdr@ex.com").sdr_email, "sdr@ex.com");
});

test("resolverDestino: Até 30 mil + Sim = D; + Não = hq sem categoria; demais faixas sem categoria", () => {
  assert.deepEqual(resolverDestino({ faturamento: "Até 30 mil", investiria: "Sim" }), {
    destination: "hq",
    lead_category: "D",
  });
  assert.deepEqual(resolverDestino({ faturamento: "Até 30 mil", investiria: "Não" }), { destination: "hq" });
  assert.deepEqual(resolverDestino({ faturamento: "Mais de 1 milhão" }), { destination: "hq" });
});

test("CNPJ vai como document", () => {
  const payload = buildCrmLeadPayload(
    { ...lead, faturamento: "Até 30 mil", investiria: "Sim", cnpj: "11.222.333/0001-81" },
    {},
    undefined
  );
  assert.equal(payload.document, "11.222.333/0001-81");
  assert.equal(payload.lead_category, "D");
});

async function captureErrors(fn: () => Promise<void>) {
  process.env.CRM_API_URL = "https://crm.ex.com/";
  process.env.CRM_EXTERNAL_LEADS_API_KEY = "chave";
  const logs: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => logs.push(args.map(String).join(" "));
  try {
    await fn();
  } finally {
    console.error = originalError;
  }
  return logs;
}

const semDadosPessoais = (logs: string[]) =>
  logs.length > 0 && logs.every((l) => !l.includes("ana") && !l.includes("Ana") && !l.includes("5511"));

test("envio: URL, x-api-key e corpo JSON", async () => {
  let call: { url: string; init: RequestInit } | undefined;
  const fakeFetch = (async (url: string, init: RequestInit) => {
    call = { url, init };
    return new Response(JSON.stringify({ crmLeadId: "123" }), { status: 201 });
  }) as unknown as typeof fetch;
  await captureErrors(async () => {
    const res = await sendLeadToCrm(buildCrmLeadPayload(lead, tracking, undefined), fakeFetch);
    assert.deepEqual(res, { ok: true, httpStatus: 201, crmLeadId: "123" });
  });
  assert.equal(call?.url, "https://crm.ex.com/external/leads");
  assert.equal((call?.init.headers as Record<string, string>)["x-api-key"], "chave");
  assert.equal(JSON.parse(String(call?.init.body)).source, "alpha-home");
});

test("falha do CRM: loga status e código, nunca dados do lead", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ code: "INVALID_DETAILS", message: "ana@ex.com inválido" }), {
      status: 400,
    })) as unknown as typeof fetch;
  const logs = await captureErrors(async () => {
    const res = await sendLeadToCrm(buildCrmLeadPayload(lead, tracking, undefined), fakeFetch);
    assert.deepEqual(res, { ok: false, httpStatus: 400, reason: "INVALID_DETAILS" });
  });
  assert.ok(semDadosPessoais(logs));
});

test("falha de rede: ok false com status 0 e log sem dados pessoais", async () => {
  const fakeFetch = (async () => {
    throw new DOMException("timeout ana@ex.com", "TimeoutError");
  }) as unknown as typeof fetch;
  const logs = await captureErrors(async () => {
    const res = await sendLeadToCrm(buildCrmLeadPayload(lead, tracking, undefined), fakeFetch);
    assert.deepEqual(res, { ok: false, httpStatus: 0, reason: "TimeoutError" });
  });
  assert.ok(semDadosPessoais(logs));
});

test("sem env: não chama o CRM", async () => {
  delete process.env.CRM_API_URL;
  const originalError = console.error;
  console.error = () => {};
  try {
    const res = await sendLeadToCrm(buildCrmLeadPayload(lead, {}, undefined), (() => {
      throw new Error("não deveria chamar");
    }) as unknown as typeof fetch);
    assert.deepEqual(res, { ok: false, httpStatus: 0, reason: "crm_not_configured" });
  } finally {
    console.error = originalError;
  }
});
