import LeadForm from "@/components/lead-form";
import { content } from "@/lib/content";

const { hero } = content;

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-[130px] pb-[70px] md:pt-[170px] md:pb-[110px]">
      <div className="container-alpha relative z-[1] grid grid-cols-1 items-center gap-12 desk:grid-cols-[1.15fr_.85fr] desk:gap-14">
        <div>
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="mb-6 font-display text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.08] font-semibold">
            <span className="block">{hero.titleLine1}</span>
            <span className="gold-text block">{hero.titleLine2}</span>
          </h1>
          <p className="mb-9 max-w-[520px] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.7] font-light text-text-muted">
            {hero.subtitle}
          </p>
          <dl className="mb-[38px] flex flex-wrap gap-[30px]">
            {hero.trust.map((item) => (
              <div key={item.label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-[11.5px] text-text-dim">{item.label}</dt>
                <dd className="font-heading text-[19px] font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
          <a href={hero.secondaryCta.href} className="btn btn-ghost">
            {hero.secondaryCta.label}
          </a>
        </div>

        <div
          id="contato"
          className="relative z-[1] w-full max-w-[480px] scroll-mt-28 rounded-[32px] border border-border-strong bg-glass px-6 py-8 shadow-[0_40px_100px_rgba(0,0,0,.5)] backdrop-blur-[12px] sm:px-9 sm:py-10 desk:max-w-none"
        >
          <h2 className="mb-1.5 text-[19px] font-semibold">{hero.formTitle}</h2>
          <p className="mb-6 text-[13.5px] text-text-dim">{hero.formSubtitle}</p>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
