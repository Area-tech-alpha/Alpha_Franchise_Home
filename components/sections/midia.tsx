import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";

const { midia } = content;

export default function Midia() {
  const { items } = midia;

  return (
    <section id="imprensa" aria-labelledby="imprensa-titulo" className="relative py-[70px]">
      <div className="container-alpha">
        <div className="section-head center reveal">
          <span className="eyebrow">{midia.eyebrow}</span>
          <h2 id="imprensa-titulo">{midia.title}</h2>
        </div>

        <ul className="mx-auto grid max-w-[1000px] grid-cols-1 gap-[22px] md:grid-cols-2">
          {items.map((item) => (
            <li key={item.outlet} className="reveal">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full overflow-hidden rounded-[22px] border border-border bg-bg-1 transition-[transform,border-color] duration-400 hover:-translate-y-1.5 hover:border-border-gold"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-4 left-4 z-[1] rounded-full border border-border-gold bg-[rgba(10,10,11,.75)] px-3.5 py-[7px] text-[11px] font-bold tracking-[.08em] text-gold-1 uppercase">
                    {item.outlet}
                  </span>
                  <span
                    className="absolute top-4 right-4 z-[1] flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-[rgba(10,10,11,.75)] text-white transition-colors group-hover:bg-gold-1 group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="p-[22px]">
                  <h3 className="text-[15.5px] leading-[1.4]">
                    {item.title}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.6] font-light text-text-muted">{item.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <a href={midia.cta.href} className="btn btn-ghost">
            {midia.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
