import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FATURAMENTO_EXIGE_EXTRAS, TRACKING_KEYS, type LeadTracking } from "@/lib/lead-constants";

export { FATURAMENTO_EXIGE_EXTRAS, TRACKING_KEYS, type LeadTracking };

function cnpjDigit(digits: string, length: number): number {
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(digits[length - i]) * pos--;
    if (pos < 2) pos = 9;
  }
  const rem = sum % 11;
  return rem < 2 ? 0 : 11 - rem;
}

export function isValidCNPJ(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  return (
    cnpjDigit(digits, 12) === parseInt(digits[12]) &&
    cnpjDigit(digits, 13) === parseInt(digits[13])
  );
}

export const leadSchema = z
  .object({
    nome: z.string().trim().min(2, "Nome obrigatório").max(120),
    email: z.string().trim().email("E-mail inválido").max(200),
    telefone: z
      .string()
      .min(1, "Telefone obrigatório")
      .refine((v) => isValidPhoneNumber(v), "Telefone inválido"),
    empresa: z.string().trim().min(2, "Nome da empresa obrigatório").max(160),
    segmento: z.string().min(1, "Selecione um segmento").max(80),
    faturamento: z.string().min(1, "Selecione uma faixa de faturamento").max(80),
    cnpj: z.string().max(20).optional(),
    investiria: z.enum(["Sim", "Não"], { message: "Selecione uma opção" }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.faturamento !== FATURAMENTO_EXIGE_EXTRAS) return;
    if (!data.cnpj || !isValidCNPJ(data.cnpj)) {
      ctx.addIssue({ code: "custom", message: "CNPJ inválido", path: ["cnpj"] });
    }
    if (!data.investiria) {
      ctx.addIssue({ code: "custom", message: "Selecione uma opção", path: ["investiria"] });
    }
  });

export type LeadFormData = z.infer<typeof leadSchema>;

// Parâmetros de atribuição lidos da URL no navegador. Vêm de fora e nunca
// barram o lead: valor inválido, vazio ou longo demais é só descartado.
const trackingValue = z.string().trim().min(1).max(500);

export function parseTracking(raw: unknown): LeadTracking {
  const source = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const tracking: LeadTracking = {};
  for (const key of TRACKING_KEYS) {
    const parsed = trackingValue.safeParse(source[key]);
    if (parsed.success) tracking[key] = parsed.data;
  }
  return tracking;
}
