"use client";

import { useEffect, useRef, useState } from "react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import type { Country, Value as PhoneValue } from "react-phone-number-input";
import ptBR from "react-phone-number-input/locale/pt-BR.json";

// Carregado sob demanda pelo lead-form (primeira interação com o form): a base
// de DDIs do libphonenumber não entra no JS inicial da página.

// Mesmos DDIs do form atual do WP.
const COUNTRIES: Country[] = ["BR", "PT", "US", "AR", "PY", "UY", "CL", "MX", "CO", "ES"];

// Emoji em vez do ícone padrão do react-phone-number-input, que busca SVGs de
// bandeira em um CDN externo e concorria com o LCP.
export function flagEmoji(country?: Country) {
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

export default function PhoneField({
  value,
  onChange,
  placeholder,
  invalid,
  describedBy,
  autoFocus,
}: {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder: string;
  invalid: boolean;
  describedBy?: string;
  autoFocus?: boolean;
}) {
  return (
    <PhoneInput
      id="telefone"
      name="telefone"
      defaultCountry="BR"
      countries={COUNTRIES}
      labels={ptBR}
      international={false}
      autoComplete="tel"
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value as PhoneValue | undefined}
      onChange={(v) => onChange(v)}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="phone-input-wrapper"
      countrySelectComponent={CountrySelect as never}
    />
  );
}
