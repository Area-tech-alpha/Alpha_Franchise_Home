import { content } from "@/lib/content";

const { metodologia } = content;

export default function Metodologia() {
  return (
    <section id="metodologia" aria-labelledby="metodologia-titulo" className="relative py-[70px]">
      <div className="container-wide">
        <div className="section-head center reveal">
          <span className="eyebrow">{metodologia.eyebrow}</span>
          <h2 id="metodologia-titulo">{metodologia.title}</h2>
          <p>{metodologia.subtitle}</p>
        </div>

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {metodologia.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal rounded-[22px] border border-border bg-bg-1 px-[26px] py-8 transition-colors duration-400 hover:border-border-gold"
            >
              <span
                className="gold-text mb-5 block font-display text-[clamp(3rem,5vw,4.2rem)] leading-none font-semibold"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-[17px]">{step.title}</h3>
              <p className="text-[13.5px] leading-[1.6] font-light text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
