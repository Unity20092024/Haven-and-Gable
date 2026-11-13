export const siteOrigin = "https://haven-gable.vercel.app";
export function articleCanonical(slug: string) {
  return `${siteOrigin}/guides/${encodeURIComponent(slug)}`;
}

/** Only actual published content with real author/date information may emit an
 * Article entity. The demonstration deliberately returns null. */
export function articleStructuredData(input: {
  isDemo: boolean;
  slug: string;
  title: string;
  image: string;
  author?: string;
  publishedAt?: string;
}) {
  if (
    input.isDemo ||
    !input.author?.trim() ||
    !input.publishedAt ||
    !/^\d{4}-\d{2}-\d{2}/.test(input.publishedAt) ||
    Number.isNaN(Date.parse(input.publishedAt))
  )
    return null;
  const date = new Date(input.publishedAt.slice(0, 10) + "T00:00:00Z");
  if (date.toISOString().slice(0, 10) !== input.publishedAt.slice(0, 10))
    return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    url: articleCanonical(input.slug),
    image: `${siteOrigin}${input.image}`,
    author: { "@type": "Person", name: input.author },
    datePublished: input.publishedAt,
  };
}
export function breadcrumbStructuredData(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Greenhouses",
        item: siteOrigin + "/#featured-guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleCanonical(slug),
      },
    ],
  };
}
export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
