import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/ui/mobile-menu";
import { hasPublicFile } from "@/lib/assets";
import { content } from "@/lib/content";

const { nav, logo } = content;

export default function Header() {
  const hasLogo = hasPublicFile(logo.src);

  return (
    <header className="fixed top-3.5 left-1/2 z-[1000] flex w-[92%] max-w-[1220px] -translate-x-1/2 items-center justify-between rounded-full border border-border bg-[rgba(10,10,11,.72)] py-3 pr-5 pl-[22px] backdrop-blur-[18px] md:top-[18px] md:w-[90%]">
      <Link href="/" aria-label={`${logo.alt}, início`} className="flex items-center">
        {hasLogo ? (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            sizes="118px"
            className="h-[38px] w-auto object-contain"
          />
        ) : (
          <span className="font-display text-lg font-semibold tracking-wide">{logo.alt}</span>
        )}
      </Link>

      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-[clamp(14px,1.8vw,26px)]">
          {nav.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-[13.5px] whitespace-nowrap text-text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-1 after:transition-[width] after:duration-300 hover:text-white hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href={nav.cta.href} className="btn btn-primary btn-sm hidden min-h-0 px-[22px] py-[11px] lg:inline-flex">
        {nav.cta.label}
      </a>

      <MobileMenu links={nav.links} cta={nav.cta} />
    </header>
  );
}
