const PRODUCTION_URL = "https://assessorialpha.com";

function stripSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = stripSlash(process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL);

// Blog, Cursos, Cases, Alpha's Pizzaria e matérias continuam no WordPress até a
// troca de DNS (subdomínio ou rewrite ainda não decidido).
export const WP_URL = stripSlash(process.env.NEXT_PUBLIC_WP_URL || PRODUCTION_URL);

export function wpUrl(path: string) {
  return `${WP_URL}/${path.replace(/^\/+/, "")}`;
}

// Só o domínio definitivo é indexado; o deploy temporário (*.vercel.app) fica fora do Google.
export const IS_PRODUCTION_SITE = SITE_URL === PRODUCTION_URL;
