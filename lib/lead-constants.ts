// Constantes do form sem dependências: o componente do form importa daqui para
// não puxar o zod no carregamento da página.
export const FATURAMENTO_EXIGE_EXTRAS = "Até 30 mil";

export const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type LeadTracking = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;
