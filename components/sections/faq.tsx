import { Plus } from "lucide-react";
import { FaqJsonLd } from "@/components/json-ld";
import { content } from "@/lib/content";

const { faq } = content;

// Accordion nativo (<details>): abre/fecha sem JavaScript.
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="relative py-[70px]">
      <FaqJsonLd />
      <div className="container-alpha grid grid-cols-1 gap-9 min-[1101px]:grid-cols-[.8fr_1.2fr] min-[1101px]:gap-[70px]">
        <div className="reveal min-[1101px]:sticky min-[1101px]:top-[120px] min-[1101px]:self-start">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 id="faq-titulo" className="text-[clamp(1.9rem,3.2vw,2.5rem)] leading-[1.2]">
            {faq.title}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item) => (
            <details
              key={item.question}
              name="faq"
              className="group reveal rounded-2xl border border-border border-l-2 border-l-transparent bg-glass px-6 py-[22px] transition-colors hover:bg-glass-strong open:border-l-gold-1 open:bg-[rgba(255,183,3,.05)] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-heading text-base font-semibold text-white">
                {item.question}
                <Plus
                  className="h-[18px] w-[18px] shrink-0 text-gold-1 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3.5 max-w-[600px] text-[14.5px] leading-[1.7] font-light text-text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
