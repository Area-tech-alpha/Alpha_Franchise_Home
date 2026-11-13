import type { Metadata } from "next";
import { Utensils } from "lucide-react";
import CtaFinal from "@/components/sections/cta-final";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { VideoCard } from "@/components/ui/video-card";
import { YoutubeShort } from "@/components/ui/youtube-player";
import { content } from "@/lib/content";
import { availableShorts, availableVideos } from "@/lib/depoimentos";

const { depoimentos } = content;

export const metadata: Metadata = {
  title: `${depoimentos.page.title} | ${content.meta.siteName}`,
  description: depoimentos.page.heading,
  alternates: { canonical: "/depoimentos" },
};

export default function DepoimentosPage() {
  const videos = availableVideos();
  const shorts = availableShorts();

  return (
    <>
      <Header />
      <main className="pt-[130px] md:pt-[170px]">
        <section aria-labelledby="depoimentos-titulo" className="pb-[70px]">
          <div className="container-wide">
            <div className="section-head">
              <span className="eyebrow">{depoimentos.eyebrow}</span>
              <h1 id="depoimentos-titulo" className="text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.16]">
                {depoimentos.page.heading}
              </h1>
            </div>

            {videos.length > 0 && (
              <>
                <h2 className="mb-[18px] flex items-center gap-2.5 font-body text-[12.5px] font-semibold tracking-[.1em] text-text-dim uppercase">
                  <Utensils className="h-[15px] w-[15px] text-gold-1" aria-hidden="true" />
                  {depoimentos.label}
                </h2>
                <ul className="mb-14 grid grid-cols-1 gap-[22px] md:grid-cols-2 desk:grid-cols-3">
                  {videos.map((video) => (
                    <li key={video.slug}>
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
              </>
            )}

            {shorts.length > 0 && (
              <>
                <h2 className="mb-[18px] flex items-center gap-2.5 font-body text-[12.5px] font-semibold tracking-[.1em] text-text-dim uppercase">
                  <Utensils className="h-[15px] w-[15px] text-gold-1" aria-hidden="true" />
                  {depoimentos.page.shortsLabel}
                </h2>
                <ul className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 desk:grid-cols-3">
                  {shorts.map((short) => (
                    <li key={short.videoId} className="mx-auto w-full max-w-[400px]">
                      <YoutubeShort
                        videoId={short.videoId}
                        poster={short.poster}
                        name={short.name}
                        role={short.role}
                        badge={short.badge}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
