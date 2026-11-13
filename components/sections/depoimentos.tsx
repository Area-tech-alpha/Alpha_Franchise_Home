import Link from "next/link";
import { Utensils } from "lucide-react";
import { VideoCard } from "@/components/ui/video-card";
import { content } from "@/lib/content";
import { availableVideos } from "@/lib/depoimentos";

const { depoimentos } = content;

export default function Depoimentos() {
  const videos = availableVideos().slice(0, depoimentos.homeCount);
  if (videos.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="relative py-[70px]">
      <div className="container-wide">
        <div className="section-head reveal">
          <span className="eyebrow">{depoimentos.eyebrow}</span>
          <h2 id="depoimentos-titulo">{depoimentos.title}</h2>
        </div>
        <p className="mb-[18px] flex items-center gap-2.5 text-[12.5px] font-semibold tracking-[.1em] text-text-dim uppercase">
          <Utensils className="h-[15px] w-[15px] text-gold-1" aria-hidden="true" />
          {depoimentos.label}
        </p>
        <ul className="grid grid-cols-1 gap-[22px] md:grid-cols-2 min-[1101px]:grid-cols-4">
          {videos.map((video) => (
            <li key={video.slug} className="reveal">
              <VideoCard
                src={video.src}
                poster={video.poster}
                name={video.name}
                role={depoimentos.videoRole}
                badge={depoimentos.videoBadge}
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href={depoimentos.cta.href} className="btn btn-ghost">
            {depoimentos.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
