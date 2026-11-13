import "server-only";
import { hasPublicFile } from "@/lib/assets";
import { content } from "@/lib/content";

const { depoimentos } = content;

// Convenção de arquivos (convertidos com ffmpeg, ver README):
//   public/videos/depoimento-<slug>.mp4 + depoimento-<slug>-poster.jpg
//   public/images/depoimentos/short-<videoId>.jpg
export function availableVideos() {
  return depoimentos.videos
    .map((v) => ({
      ...v,
      src: `/videos/depoimento-${v.slug}.mp4`,
      poster: `/videos/depoimento-${v.slug}-poster.jpg`,
    }))
    .filter((v) => hasPublicFile(v.src) && hasPublicFile(v.poster));
}

export function availableShorts() {
  return depoimentos.shorts
    .map((s) => ({ ...s, poster: `/images/depoimentos/short-${s.videoId}.jpg` }))
    .filter((s) => hasPublicFile(s.poster));
}
