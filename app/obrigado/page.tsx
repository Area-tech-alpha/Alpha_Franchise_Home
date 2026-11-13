import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { content } from "@/lib/content";

const { obrigado } = content;

export const metadata: Metadata = {
  title: `${obrigado.title} | ${content.meta.siteName}`,
  robots: { index: false, follow: false },
};

export default function Obrigado() {
  return (
    <main className="flex min-h-screen items-center justify-center px-[6%] py-20 text-center">
      <div className="max-w-[560px]">
        <CircleCheck className="mx-auto mb-6 h-12 w-12 text-gold-1" aria-hidden="true" />
        <h1 className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.15] font-semibold">
          {obrigado.title}
        </h1>
        <p className="mb-10 text-[16.5px] leading-[1.65] font-light text-text-muted">{obrigado.text}</p>
        <Link href="/" className="btn btn-ghost">
          {obrigado.back}
        </Link>
      </div>
    </main>
  );
}
