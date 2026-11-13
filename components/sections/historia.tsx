import { content } from "@/lib/content";

const { historia } = content;

const marcos = [{ ...historia.fundacao, highlight: false, quote: undefined }, ...historia.marcos];

export default function Historia() {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="relative py-[70px]">
      <div className="container-alpha">
        <div className="section-head center reveal">
          <span className="eyebrow">{historia.eyebrow}</span>
          <h2 id="historia-titulo">{historia.title}</h2>
        </div>

        <ol className="relative mx-auto max-w-[760px] border-l border-border pl-7 md:pl-10">
          {marcos.map((marco) => (
            <li key={marco.title} className="reveal relative pb-10 last:pb-0">
              <span
                className={`absolute top-1.5 -left-[33px] h-2.5 w-2.5 rounded-full md:-left-[45px] ${
                  marco.highlight ? "bg-gold-1 shadow-[0_0_12px_var(--gold-1)]" : "border border-border-strong bg-bg-1"
                }`}
                aria-hidden="true"
              />
              <p className="mb-2 text-xs font-bold tracking-[.12em] text-gold-1 uppercase">{marco.date}</p>
              <h3 className="mb-2 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.25]">{marco.title}</h3>
              <p className="text-[14.5px] leading-[1.65] font-light text-text-muted">{marco.text}</p>
              {marco.quote && (
                <blockquote className="mt-4 rounded-r-[10px] border-l-2 border-gold-1 bg-[rgba(255,183,3,.05)] px-4 py-3 text-[13px] text-text-muted italic">
                  {marco.quote}
                </blockquote>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
