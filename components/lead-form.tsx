"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { submitLead } from "@/app/actions/submit-lead";
import type PhoneFieldType from "@/components/ui/phone-field";
import { content } from "@/lib/content";
import { FATURAMENTO_EXIGE_EXTRAS, TRACKING_KEYS, type LeadTracking } from "@/lib/lead-constants";

const { form } = content;
const { fields } = form;

const TRACKING_STORAGE_KEY = "alpha-home:tracking";

// Seletor de DDI (libphonenumber) e zod ficam fora do JS inicial: o seletor
// carrega na primeira interação com o form e o zod no envio.
type PhoneFieldComponent = typeof PhoneFieldType;
let phoneFieldPromise: Promise<PhoneFieldComponent> | null = null;
function loadPhoneField() {
  phoneFieldPromise ??= import("@/components/ui/phone-field").then((m) => m.default);
  return phoneFieldPromise;
}

// Antes do seletor carregar, o telefone digitado vale como número do Brasil.
function fallbackToE164(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? `+55${digits}` : undefined;
}

function maskCNPJ(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

// UTMs/fbclid da URL de entrada. Guardados na sessão para sobreviver à navegação
// interna (ex.: /depoimentos e volta para a home).
function readTracking(): LeadTracking {
  const tracking: LeadTracking = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) tracking[key] = value;
  }
  try {
    if (Object.keys(tracking).length > 0) {
      sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(tracking));
      return tracking;
    }
    return JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) ?? "{}") as LeadTracking;
  } catch {
    return tracking;
  }
}

type FormValues = {
  nome: string;
  email: string;
  telefone: string | undefined;
  empresa: string;
  segmento: string;
  faturamento: string;
  cnpj: string;
  investiria: string;
};

type FieldName = keyof FormValues;

const initial: FormValues = {
  nome: "",
  email: "",
  telefone: undefined,
  empresa: "",
  segmento: "",
  faturamento: "",
  cnpj: "",
  investiria: "",
};

const labelClass = "field-label";
const errorClass = "mt-1.5 block text-[11.5px] text-error";

function FieldError({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null;
  return (
    <span id={`erro-${name}`} className={errorClass} role="alert">
      {message}
    </span>
  );
}

function Select({
  id,
  value,
  placeholder,
  options,
  error,
  onChange,
}: {
  id: FieldName;
  value: string;
  placeholder: string;
  options: readonly string[];
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `erro-${id}` : undefined}
        className={`field-input ${value ? "" : "text-text-dim"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-text-muted"
        aria-hidden="true"
      >
        ▾
      </span>
    </div>
  );
}

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sending, setSending] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const trackingRef = useRef<LeadTracking>({});
  const [PhoneField, setPhoneField] = useState<ComponentType<Parameters<PhoneFieldComponent>[0]> | null>(null);
  const [rawPhone, setRawPhone] = useState("");
  const rawPhoneRef = useRef("");
  const [phoneFocused, setPhoneFocused] = useState(false);

  function warmUp() {
    if (PhoneField) return;
    loadPhoneField().then((Component) => {
      setValues((prev) => (prev.telefone ? prev : { ...prev, telefone: fallbackToE164(rawPhoneRef.current) }));
      setPhoneField(() => Component);
    });
  }

  useEffect(() => {
    trackingRef.current = readTracking();
  }, []);

  const needsExtras = values.faturamento === FATURAMENTO_EXIGE_EXTRAS;

  function set(field: FieldName, value: string | undefined) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function setFaturamento(value: string) {
    const keepExtras = value === FATURAMENTO_EXIGE_EXTRAS;
    setValues((prev) => ({
      ...prev,
      faturamento: value,
      cnpj: keepExtras ? prev.cnpj : "",
      investiria: keepExtras ? prev.investiria : "",
    }));
    setErrors((prev) => ({ ...prev, faturamento: undefined, cnpj: undefined, investiria: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value;
    if (honeypot) return;

    const payload = {
      nome: values.nome.trim(),
      email: values.email.trim(),
      telefone: (PhoneField ? values.telefone : fallbackToE164(rawPhone)) ?? "",
      empresa: values.empresa.trim(),
      segmento: values.segmento,
      faturamento: values.faturamento,
      ...(needsExtras && { cnpj: values.cnpj, investiria: values.investiria || undefined }),
    };

    const { leadSchema } = await import("@/lib/validation");
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        fieldErrors[field] ??= issue.message;
      }
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setSending(true);
    setGlobalError("");
    try {
      const res = await submitLead(parsed.data, trackingRef.current);
      if (res.success) {
        window.location.assign(res.redirectTo);
        return;
      }
      setGlobalError(res.error);
    } catch {
      setGlobalError(form.errors.crm);
    }
    setSending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={warmUp}
      onPointerDownCapture={warmUp}
      noValidate
      className="flex flex-col gap-3.5"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
      />

      <div>
        <label htmlFor="nome" className={labelClass}>
          {fields.nome.label}
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          placeholder={fields.nome.placeholder}
          value={values.nome}
          onChange={(e) => set("nome", e.target.value)}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "erro-nome" : undefined}
          className="field-input"
        />
        <FieldError name="nome" message={errors.nome} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {fields.email.label}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={fields.email.placeholder}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "erro-email" : undefined}
          className="field-input"
        />
        <FieldError name="email" message={errors.email} />
      </div>

      <div>
        <label htmlFor="telefone" className={labelClass}>
          {fields.telefone.label}
        </label>
        {PhoneField ? (
          <PhoneField
            value={values.telefone}
            onChange={(v) => set("telefone", v)}
            placeholder={fields.telefone.placeholder}
            invalid={!!errors.telefone}
            describedBy={errors.telefone ? "erro-telefone" : undefined}
            autoFocus={phoneFocused}
          />
        ) : (
          // Mesmo layout do seletor carregado, para não haver layout shift.
          <div className="phone-input-wrapper">
            <span
              className="flex shrink-0 items-center gap-1.5 rounded-[10px] border border-border bg-white/[0.04] px-3 py-3 text-sm text-white"
              aria-hidden="true"
            >
              <span>🇧🇷</span>
              <span>+55</span>
              <span className="text-[10px] text-text-dim">▾</span>
            </span>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              placeholder={fields.telefone.placeholder}
              value={rawPhone}
              onChange={(e) => {
                rawPhoneRef.current = e.target.value;
                setRawPhone(e.target.value);
              }}
              onFocus={() => setPhoneFocused(true)}
              aria-invalid={!!errors.telefone}
              aria-describedby={errors.telefone ? "erro-telefone" : undefined}
              className="PhoneInputInput"
            />
          </div>
        )}
        <FieldError name="telefone" message={errors.telefone} />
      </div>

      <div>
        <label htmlFor="empresa" className={labelClass}>
          {fields.empresa.label}
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          required
          placeholder={fields.empresa.placeholder}
          value={values.empresa}
          onChange={(e) => set("empresa", e.target.value)}
          aria-invalid={!!errors.empresa}
          aria-describedby={errors.empresa ? "erro-empresa" : undefined}
          className="field-input"
        />
        <FieldError name="empresa" message={errors.empresa} />
      </div>

      <div>
        <label htmlFor="segmento" className={labelClass}>
          {fields.segmento.label}
        </label>
        <Select
          id="segmento"
          value={values.segmento}
          placeholder={fields.segmento.placeholder}
          options={fields.segmento.options}
          error={errors.segmento}
          onChange={(v) => set("segmento", v)}
        />
        <FieldError name="segmento" message={errors.segmento} />
      </div>

      <div>
        <label htmlFor="faturamento" className={labelClass}>
          {fields.faturamento.label}
        </label>
        <Select
          id="faturamento"
          value={values.faturamento}
          placeholder={fields.faturamento.placeholder}
          options={fields.faturamento.options}
          error={errors.faturamento}
          onChange={setFaturamento}
        />
        <FieldError name="faturamento" message={errors.faturamento} />
      </div>

      {needsExtras && (
        <>
          <div>
            <label htmlFor="cnpj" className={labelClass}>
              {fields.cnpj.label}
            </label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              inputMode="numeric"
              required
              placeholder={fields.cnpj.placeholder}
              value={values.cnpj}
              onChange={(e) => set("cnpj", maskCNPJ(e.target.value))}
              aria-invalid={!!errors.cnpj}
              aria-describedby={errors.cnpj ? "erro-cnpj" : undefined}
              className="field-input"
            />
            <FieldError name="cnpj" message={errors.cnpj} />
          </div>

          <div>
            <label htmlFor="investiria" className={labelClass}>
              {fields.investiria.label}
            </label>
            <Select
              id="investiria"
              value={values.investiria}
              placeholder={fields.investiria.placeholder}
              options={fields.investiria.options}
              error={errors.investiria}
              onChange={(v) => set("investiria", v)}
            />
            <FieldError name="investiria" message={errors.investiria} />
          </div>
        </>
      )}

      {globalError && (
        <p className="text-center text-sm text-error" role="alert">
          {globalError}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn btn-primary mt-1.5 w-full">
        {sending ? form.sending : form.submitLabel}
      </button>
    </form>
  );
}
