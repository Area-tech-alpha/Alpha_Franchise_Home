import { CircleCheck, CircleX } from "lucide-react";
import { content } from "@/lib/content";

const { antesDepois } = content;

export default function AntesDepois() {
  return (
    <section id="efeitos" aria-labelledby="efeitos-titulo" className="relative py-[70px]">
      <div className="container-alpha">
        <div className="section-head center reveal">
          <span className="eyebrow">{antesDepois.eyebrow}</span>
          <h2 id="efeitos-titulo">{antesDepois.title}</h2>
        </div>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="reveal rounded-[32px] border border-border bg-bg-1 px-[26px] py-[30px] md:p-10">
            <h3 className="mb-5 inline-flex rounded-full border border-border bg-glass-strong px-3.5 py-1.5 font-body text-[11px] font-bold tracking-[.14em] text-text-muted uppercase">
              {antesDepois.antes.label}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {antesDepois.antes.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-light text-text-muted">
                  <CircleX className="h-4 w-4 shrink-0 text-text-dim" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal rounded-[32px] border border-border-gold px-[26px] py-[30px] md:p-10"
            style={{ background: "linear-gradient(150deg, rgba(255,183,3,.16), rgba(255,255,255,.02))" }}
          >
            <h3 className="mb-5 inline-flex rounded-full bg-gold-1 px-3.5 py-1.5 font-body text-[11px] font-bold tracking-[.14em] text-ink uppercase">
              {antesDepois.depois.label}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {antesDepois.depois.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-light text-white">
                  <CircleCheck className="h-4 w-4 shrink-0 text-gold-1" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
