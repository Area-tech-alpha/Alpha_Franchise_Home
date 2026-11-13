import Image from "next/image";
import { content } from "@/lib/content";

const { marcas } = content;

export default function LogosMarquee() {
  const { logos } = marcas;

  return (
    <section id="marcas" aria-labelledby="marcas-titulo" className="py-[70px]">
      <h2
        id="marcas-titulo"
        className="mb-[30px] text-center font-body text-xs font-normal tracking-[.14em] text-text-dim uppercase"
      >
        {marcas.label}
      </h2>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {/* Lista duplicada para o loop contínuo; a cópia fica fora da árvore de acessibilidade. */}
        <div className="logo-track flex w-max gap-2">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-2" aria-hidden={copy === 1 || undefined}>
              {logos.map((logo) => (
                <li key={logo.name} className="flex items-center justify-center px-[26px] opacity-75">
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    width={170}
                    height={58}
                    sizes="170px"
                    className="h-[58px] w-auto max-w-[170px] object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
