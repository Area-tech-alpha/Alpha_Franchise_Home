import Image from "next/image";
import { MapPin } from "lucide-react";
import { hasPublicFile } from "@/lib/assets";
import { content } from "@/lib/content";

const { footer, logo } = content;

const linkClass =
  "relative mb-3.5 inline-block w-fit text-[14.5px] text-text-muted transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold-1 after:transition-[width] after:duration-300 hover:text-white hover:after:w-full";

export default function Footer() {
  const socials = footer.socials.filter((s): s is { label: string; href: string } => !!s.href);

  return (
    <footer className="relative overflow-hidden border-t border-border pt-[70px] pb-[30px]">
      <div className="container-alpha relative z-[1]">
        <div className="grid grid-cols-1 gap-9 border-b border-border pb-11 md:grid-cols-2 md:gap-x-8 md:gap-y-10 desk:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
          <div>
            {hasPublicFile(logo.src) ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="118px"
                className="h-[38px] w-auto object-contain"
              />
            ) : (
              <p className="font-display text-lg font-semibold">{logo.alt}</p>
            )}
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
                      className="flex h-[42px] items-center justify-center rounded-full border border-border-strong px-4 text-xs text-text-muted transition-colors hover:border-gold-1 hover:bg-gold-1 hover:text-ink"
                    >
                      {s.label}
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
