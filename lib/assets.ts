import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

// Mídia que ainda não está em public/ não aparece: a seção (ou o item) sai em vez
// de quebrar. Roda no build (SSG), não no navegador.
export function hasPublicFile(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
