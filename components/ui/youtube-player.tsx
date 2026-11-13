"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, TrendingUp } from "lucide-react";

// Short do YouTube: thumbnail local (nunca hotlink) e iframe só depois do clique.
export function YoutubeShort({
  videoId,
  poster,
  name,
  role,
  badge,
}: {
  videoId: string;
  poster: string;
  name: string;
  role: string;
  badge?: string | null;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-[22px] bg-bg-1">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={name}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Reproduzir: ${name}`}
          className="absolute inset-0 h-full w-full cursor-pointer text-left"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover brightness-[.6] transition-transform duration-500 group-hover:scale-[1.07]"
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,.85) 10%, transparent 55%)" }}
            aria-hidden="true"
          />
          {badge && (
            <span className="absolute top-4 right-4 z-[2] flex items-center gap-1.5 rounded-full border border-border-gold bg-[rgba(10,10,11,.7)] px-3 py-[7px] text-[11px] font-semibold text-white">
              <TrendingUp className="h-3 w-3 text-gold-1" aria-hidden="true" />
              {badge}
            </span>
          )}
          <span
            className="absolute top-1/2 left-1/2 z-[1] flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/[.12] backdrop-blur-[10px] transition-transform duration-300 group-hover:scale-[1.12]"
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
