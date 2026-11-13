import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export function OrganizationJsonLd() {
  const sameAs = content.footer.socials.flatMap((s) => (s.href ? [s.href] : []));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.meta.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}${content.logo.src}`,
    description: content.footer.about,
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  items = content.faq.items,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
