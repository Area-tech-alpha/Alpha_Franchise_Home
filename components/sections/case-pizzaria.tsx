import Image from "next/image";
import { hasPublicFile } from "@/lib/assets";
import { content } from "@/lib/content";

const { pizzaria } = content;

export default function CasePizzaria() {
  const hasPhoto = hasPublicFile(pizzaria.image.src);

  return (
    <section
      id="alphas"
      aria-labelledby="alphas-titulo"
      className="relative flex min-h-[86vh] items-end overflow-hidden md:min-h-screen"
    >
      {hasPhoto && (
        <div className="absolute inset-0 z-0">
          <Image
            src={pizzaria.image.src}
            alt={pizzaria.image.alt}
            fill
            sizes="100vw"
            className="scale-[1.04] object-cover object-[center_62%]"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(0deg, rgba(2,2,2,.96) 8%, rgba(2,2,2,.55) 42%, rgba(2,2,2,.15) 68%, rgba(2,2,2,.55) 100%), radial-gradient(circle at 82% 18%, rgba(255,183,3,.16), transparent 45%)",
            }}
          />
        </div>
      )}

      <div className="reveal relative z-[1] w-full px-[6%] pt-28 pb-[60px] md:pb-[90px]">
        <span className="eyebrow">{pizzaria.eyebrow}</span>
        <h2
          id="alphas-titulo"
          className="mb-6 max-w-[820px] font-display text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.1]"
        >
          {pizzaria.title}
        </h2>
        <p className="mb-2.5 max-w-[460px] text-base leading-[1.7] font-light text-white/75">{pizzaria.text}</p>
        <dl className="mt-8 flex flex-wrap gap-2.5 md:gap-3.5">
          {pizzaria.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse rounded-[14px] border border-border-strong bg-[rgba(10,10,11,.6)] px-5 py-3.5 backdrop-blur-[14px]"
            >
              <dt className="text-[11px] text-text-dim">{stat.label}</dt>
              <dd className="font-heading text-[19px] font-semibold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
