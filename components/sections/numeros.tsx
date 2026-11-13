import { content } from "@/lib/content";

const { numeros } = content;

// Cada número só aparece quando tiver valor confirmado em lib/content.ts.
// Sem nenhum número, a seção inteira fica oculta (o título sozinho não diz nada).
export default function Numeros() {
  const destaque = numeros.destaque.value ? numeros.destaque : null;
  const items = numeros.items.filter((item) => item.value);
  if (!destaque && items.length === 0) return null;

  return (
    <section id="numeros" aria-labelledby="numeros-titulo" className="relative overflow-hidden py-[70px]">
      <div className="container-alpha">
        <div className="reveal relative z-[1] mb-[60px] max-w-[640px]">
          <span className="eyebrow">{numeros.eyebrow}</span>
          <h2 id="numeros-titulo" className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.2]">
            {numeros.title}
          </h2>
        </div>

        {destaque && (
          <p className="reveal relative z-[1] mb-[52px]">
            <span className="block font-display text-[clamp(4rem,10.5vw,9.5rem)] leading-[.95] font-semibold text-white [text-shadow:0_0_60px_rgba(255,183,3,.35)]">
              {destaque.value}
            </span>
            <span className="mt-3.5 block max-w-[360px] text-[14.5px] text-text-muted">{destaque.label}</span>
          </p>
        )}

        {items.length > 0 && (
          <dl className="relative z-[1] grid grid-cols-1 gap-7 border-t border-border pt-11 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {items.map((item) => (
              <div key={item.label} className="reveal flex flex-col-reverse">
                <dt className="mt-2.5 text-[13px] text-text-dim">{item.label}</dt>
                <dd className="font-display text-[clamp(2rem,3vw,2.6rem)] leading-none font-semibold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
