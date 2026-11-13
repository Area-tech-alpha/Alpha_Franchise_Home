import type { LeadFormData, LeadTracking } from "@/lib/validation";

// Lead da home vai direto para o CRM comercial (Dashboard-Comercial-Back-V2):
// POST {CRM_API_URL}/external/leads. Com destination "hq" nenhum campo é
// obrigatório no intake; 4xx é definitivo (não reenviar).

export type CrmRoute = { destination: "hq"; lead_category?: "D" };

// Ponto único de decisão de destino/categoria (mesma regra da Restaurante).
// "Até 30 mil" só é D respondendo "Sim" para investiria; nas outras faixas o CRM
// classifica pelo faturamento. "Até 30 mil" + "Não" vai pro hq sem categoria até
// o comercial decidir outra coisa.
export function resolverDestino(lead: Pick<LeadFormData, "faturamento" | "investiria">): CrmRoute {
  if (lead.faturamento === "Até 30 mil" && lead.investiria === "Sim") {
    return { destination: "hq", lead_category: "D" };
  }
  return { destination: "hq" };
}

export function buildCrmLeadPayload(
  lead: LeadFormData,
  tracking: LeadTracking,
  sdrEmail: string | undefined = process.env.CRM_SDR_EMAIL?.trim() || undefined
) {
  const route = resolverDestino(lead);
  return {
    destination: route.destination,
    ...(sdrEmail && { sdr_email: sdrEmail }),
    source: "alpha-home",
    niche: "food",
    lead_category: route.lead_category,
    name: lead.nome,
    company: lead.empresa,
    email: lead.email,
    phone: lead.telefone,
    document: lead.cnpj,
    faturamento: lead.faturamento,
    segmento: lead.segmento,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_content: tracking.utm_content,
    utm_term: tracking.utm_term,
    fbclid: tracking.fbclid,
  };
}

export type CrmLeadPayload = ReturnType<typeof buildCrmLeadPayload>;

// httpStatus 0 = não houve resposta (env faltando, rede ou timeout).
export type CrmResult =
  | { ok: true; httpStatus: number; crmLeadId?: string }
  | { ok: false; httpStatus: number; reason: string };

// Logs só com status e o código de erro estável do CRM: nunca o corpo, que pode
// ecoar dados do lead.
export async function sendLeadToCrm(
  payload: CrmLeadPayload,
  fetchImpl: typeof fetch = fetch
): Promise<CrmResult> {
  const baseUrl = process.env.CRM_API_URL;
  const apiKey = process.env.CRM_EXTERNAL_LEADS_API_KEY;
  if (!baseUrl || !apiKey) {
    console.error("[crm] CRM_API_URL / CRM_EXTERNAL_LEADS_API_KEY não definidas");
    return { ok: false, httpStatus: 0, reason: "crm_not_configured" };
  }

  try {
    const res = await fetchImpl(`${baseUrl.replace(/\/+$/, "")}/external/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    const body = (await res.json().catch(() => null)) as { crmLeadId?: unknown; code?: unknown } | null;

    if (!res.ok) {
      const code = typeof body?.code === "string" ? body.code : "sem_codigo";
      console.error(`[crm] Intake retornou ${res.status} (${code})`);
      return { ok: false, httpStatus: res.status, reason: code };
    }
    const crmLeadId = typeof body?.crmLeadId === "string" ? body.crmLeadId : undefined;
    return { ok: true, httpStatus: res.status, crmLeadId };
  } catch (err) {
    const reason = err instanceof Error ? err.name : "erro_desconhecido";
    console.error(`[crm] Falha de rede ao chamar o intake (${reason})`);
    return { ok: false, httpStatus: 0, reason };
  }
}
