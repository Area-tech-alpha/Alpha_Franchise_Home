"use client";

import { useEffect, useRef, useState } from "react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import type { Country, Value as PhoneValue } from "react-phone-number-input";
import ptBR from "react-phone-number-input/locale/pt-BR.json";
import { submitLead } from "@/app/actions/submit-lead";
import { content } from "@/lib/content";
import {
  FATURAMENTO_EXIGE_EXTRAS,
  TRACKING_KEYS,
  leadSchema,
  type LeadTracking,
} from "@/lib/validation";

const { form } = content;
const { fields } = form;

// Mesmos DDIs do form atual do WP.
const COUNTRIES: Country[] = ["BR", "PT", "US", "AR", "PY", "UY", "CL", "MX", "CO", "ES"];
const TRACKING_STORAGE_KEY = "alpha-home:tracking";

// Emoji em vez do ícone padrão do react-phone-number-input, que busca SVGs de
// bandeira em um CDN externo e concorria com o LCP.
function flagEmoji(country?: Country) {
  if (!country) return "🌐";
  return country.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

type CountryOption = { value?: Country; label: string; divider?: boolean };

function CountrySelect({
  value,
  onChange,
  options,
}: {
  value?: Country;
  onChange: (v?: Country) => void;
  options: CountryOption[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`DDI: ${value ? `+${getCountryCallingCode(value)}` : "selecionar"}`}
        className="flex h-full items-center gap-1.5 rounded-[10px] border border-border bg-white/[0.04] px-3 py-3 text-sm text-white transition-colors focus:border-gold-1 focus:outline-none"
      >
        <span aria-hidden="true">{flagEmoji(value)}</span>
        <span>{value ? `+${getCountryCallingCode(value)}` : ""}</span>
        <span className="text-[10px] text-text-dim" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="DDI"
          className="absolute top-full left-0 z-50 mt-1 max-h-60 w-60 overflow-y-auto rounded-xl border border-border-strong bg-[#141416] py-1 shadow-2xl"
        >
          {options
            .filter((o) => !o.divider && o.value)
            .map((opt) => (
              <li key={opt.value} role="option" aria-selected={opt.value === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.06] ${
                    opt.value === value ? "text-gold-1" : "text-white"
                  }`}
                >
                  <span aria-hidden="true">{flagEmoji(opt.value)}</span>
                  <span className="flex-1 truncate">{opt.label}</span>
                  <span className="shrink-0 text-xs text-text-dim">+{getCountryCallingCode(opt.value!)}</span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
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
  telefone: PhoneValue | undefined;
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

  useEffect(() => {
    trackingRef.current = readTracking();
  }, []);

  const needsExtras = values.faturamento === FATURAMENTO_EXIGE_EXTRAS;

  function set(field: FieldName, value: string | PhoneValue | undefined) {
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
      telefone: values.telefone ?? "",
      empresa: values.empresa.trim(),
      segmento: values.segmento,
      faturamento: values.faturamento,
      ...(needsExtras && { cnpj: values.cnpj, investiria: values.investiria || undefined }),
    };

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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
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
        <PhoneInput
          id="telefone"
          name="telefone"
          defaultCountry="BR"
          countries={COUNTRIES}
          labels={ptBR}
          international={false}
          autoComplete="tel"
          placeholder={fields.telefone.placeholder}
          value={values.telefone}
          onChange={(v) => set("telefone", v)}
          aria-invalid={!!errors.telefone}
          aria-describedby={errors.telefone ? "erro-telefone" : undefined}
          className="phone-input-wrapper"
          countrySelectComponent={CountrySelect as never}
        />
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
