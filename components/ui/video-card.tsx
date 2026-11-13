"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, Play } from "lucide-react";

// Depoimento em .mp4 auto-hospedado: só o poster carrega; o vídeo é baixado e
// toca apenas depois do clique.
export function VideoCard({
  src,
  poster,
  name,
  role,
  badge,
}: {
  src: string;
  poster: string;
  name: string;
  role: string;
  badge?: string | null;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-bg-1 transition-transform duration-400 hover:-translate-y-2">
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full bg-black object-contain"
        >
          <track kind="captions" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproduzir depoimento: ${name}`}
          className="absolute inset-0 h-full w-full cursor-pointer text-left"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
            className="object-cover object-[center_32%] brightness-[.6] transition-transform duration-500 group-hover:scale-[1.07]"
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,.85) 10%, transparent 55%)" }}
            aria-hidden="true"
          />
          {badge && (
            <span className="absolute top-4 right-4 z-[2] flex items-center gap-1.5 rounded-full border border-border-gold bg-[rgba(10,10,11,.7)] px-3 py-[7px] text-[11px] font-semibold text-white">
              <BadgeCheck className="h-3 w-3 text-gold-1" aria-hidden="true" />
              {badge}
            </span>
          )}
          <span
            className="absolute top-1/2 left-1/2 z-[1] flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/[.12] backdrop-blur-[10px] transition-[transform,background-color] duration-300 group-hover:scale-[1.12] group-hover:bg-[rgba(255,183,3,.3)]"
            aria-hidden="true"
          >
            <Play className="ml-0.5 h-5 w-5 text-white" fill="currentColor" />
          </span>
          <span className="absolute right-0 bottom-0 left-0 z-[1] p-6">
            <span className="mb-1 block font-heading text-[15.5px] font-semibold text-white">{name}</span>
            <span className="block text-[12.5px] text-text-muted">{role}</span>
          </span>
        </button>
      )}
    </div>
  );
}
