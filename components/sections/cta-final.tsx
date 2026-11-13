import { content } from "@/lib/content";

const { ctaFinal } = content;

export default function CtaFinal() {
  return (
    <section
      id="cta-final"
      aria-labelledby="cta-final-titulo"
      className="relative flex min-h-[80vh] items-center overflow-hidden py-[70px] text-center"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[70vw] max-h-[1000px] w-[70vw] max-w-[1000px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,183,3,.18), transparent 68%)" }}
        aria-hidden="true"
      />
      <span
        className="ghost top-[6%] left-1/2 -translate-x-1/2 text-[clamp(6rem,18vw,13rem)]"
        aria-hidden="true"
      >
        {ctaFinal.ghost}
      </span>
      <div className="reveal relative z-[1] mx-auto max-w-[980px] px-[6%]">
        <span className="eyebrow">{ctaFinal.eyebrow}</span>
        <h2
          id="cta-final-titulo"
          className="mb-[26px] font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.2]"
        >
          {ctaFinal.title}
        </h2>
        <p className="mx-auto mb-11 max-w-[620px] text-[16.5px] leading-[1.65] font-light text-text-muted">
          {ctaFinal.text}
        </p>
        <a href={ctaFinal.cta.href} className="btn btn-primary">
          {ctaFinal.cta.label}
        </a>
      </div>
    </section>
  );
}
