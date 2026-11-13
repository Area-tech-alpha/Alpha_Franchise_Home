import { content } from "@/lib/content";

const { historia } = content;

const marcos = [{ ...historia.fundacao, highlight: false, quote: undefined }, ...historia.marcos];

export default function Historia() {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="relative py-[70px]">
      <div className="container-wide">
        <div className="section-head center reveal">
          <span className="eyebrow">{historia.eyebrow}</span>
          <h2 id="historia-titulo">{historia.title}</h2>
        </div>

        <ol className="grid grid-cols-1 gap-[22px] md:grid-cols-2 desk:grid-cols-3">
          {marcos.map((marco, i) => (
            <li
              key={marco.title}
              className={`reveal relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[32px] border px-[30px] pt-9 pb-[30px] ${
                marco.highlight ? "border-border-gold" : "border-border bg-bg-1"
              }`}
              style={
                marco.highlight
                  ? { background: "linear-gradient(155deg, rgba(255,183,3,.14), rgba(255,255,255,.02))" }
                  : undefined
              }
            >
              <span
                className={`ghost top-4 left-6 text-[5.4rem] ${
                  marco.highlight
                    ? "[-webkit-text-stroke:1.5px_rgba(255,183,3,.35)]"
                    : "[-webkit-text-stroke:1.5px_rgba(255,255,255,.16)]"
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-[1]">
                <p className="mb-3.5 text-xs font-bold tracking-[.12em] text-gold-1 uppercase">{marco.date}</p>
                <h3 className="mb-3 text-[21px] leading-[1.25]">{marco.title}</h3>
                <p className="text-sm leading-[1.65] font-light text-text-muted">{marco.text}</p>
                {marco.quote && (
                  <blockquote className="mt-4 rounded-r-[10px] border-l-2 border-gold-1 bg-[rgba(255,183,3,.05)] px-4 py-3 text-[13px] text-text-muted italic">
                    {marco.quote}
                  </blockquote>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
