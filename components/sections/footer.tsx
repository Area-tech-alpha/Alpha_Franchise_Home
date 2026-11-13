import Image from "next/image";
import { MapPin } from "lucide-react";
import { content } from "@/lib/content";

const { footer, logo } = content;

// Ícones das marcas em SVG inline (o lucide não tem mais ícones de marca).
const SOCIAL_PATHS: Record<string, string> = {
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  TikTok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
  YouTube:
    "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}

const linkClass =
  "relative mb-3.5 inline-block w-fit text-[14.5px] text-text-muted transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold-1 after:transition-[width] after:duration-300 hover:text-white hover:after:w-full";

export default function Footer() {
  const socials = footer.socials.filter((s): s is { label: string; href: string } => !!s.href);

  return (
    <footer className="relative overflow-hidden border-t border-border pt-[70px] pb-[30px]">
      <div className="container-alpha relative z-[1]">
        <div className="grid grid-cols-1 gap-9 border-b border-border pb-11 md:grid-cols-2 md:gap-x-8 md:gap-y-10 desk:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
          <div>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="118px"
              className="h-[38px] w-auto object-contain"
            />
            <p className="mt-4 max-w-[320px] text-[14.5px] leading-[1.65] font-light text-text-dim">{footer.about}</p>
            <p className="mt-6 flex items-center gap-2.5 text-[13.5px] text-text-muted">
              <MapPin className="h-4 w-4 shrink-0 text-gold-1" aria-hidden="true" />
              {footer.location}
            </p>
            {socials.length > 0 && (
              <ul className="mt-[26px] flex gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} da Alpha (abre em nova aba)`}
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border-strong text-text-muted transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold-1 hover:bg-gold-1 hover:text-ink"
                    >
                      <SocialIcon name={s.label} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col">
              <h2 className="mb-5 font-body text-[11.5px] font-semibold tracking-[.14em] text-text-dim uppercase">
                {col.title}
              </h2>
              {col.links.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}

          <div className="md:col-span-2 desk:col-span-1">
            <h2 className="mb-3.5 font-body text-[11.5px] font-semibold tracking-[.14em] text-text-dim uppercase">
              {footer.cta.title}
            </h2>
            <p className="mb-5 max-w-[220px] text-[13.5px] leading-[1.6] font-light text-text-dim">{footer.cta.text}</p>
            <a href={footer.cta.href} className="btn btn-primary btn-sm">
              {footer.cta.label}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-[26px] md:flex-row md:items-center">
          <p className="text-[12.5px] font-light text-text-dim">{footer.copyright}</p>
          <p className="text-[12.5px] font-light text-text-dim">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
