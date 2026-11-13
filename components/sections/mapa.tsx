import Image from "next/image";
import { content } from "@/lib/content";

const { mapa } = content;

export default function Mapa() {
  return (
    <section id="mapa" aria-labelledby="mapa-titulo" className="relative overflow-hidden py-[70px]">
      <div className="container-alpha">
        <div className="reveal relative z-[1] mx-auto mb-[60px] max-w-[640px] text-center">
          <span className="eyebrow">{mapa.eyebrow}</span>
          <h2 id="mapa-titulo" className="text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.16]">
            {mapa.title}
          </h2>
          <p className="mt-4 leading-[1.65] font-light text-text-muted">{mapa.text}</p>
        </div>
        <div className="reveal relative z-[1] mx-auto max-w-[760px]">
          <Image
            src={mapa.image.src}
            alt={mapa.image.alt}
            width={mapa.image.width}
            height={mapa.image.height}
            sizes="(max-width: 840px) 88vw, 760px"
            className="h-auto w-full opacity-90 grayscale-[.2]"
          />
        </div>
      </div>
    </section>
  );
}
