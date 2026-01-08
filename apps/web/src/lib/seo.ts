export const siteConfig = {
  name: "GitHub Code Stats",
  description:
    "Generate beautiful, customizable SVG cards for your GitHub profile. Display your stats, top languages, pinned repos, and gists.",
  url: "https://github.actnow.dev",
  locale: "en_US",
  themeColor: "#000000",
};

interface MetaOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function createPageMeta({
  title,
  description = siteConfig.description,
  path = "",
}: MetaOptions) {
  const pageTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      // Open Graph
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:locale", content: siteConfig.locale },
      // Twitter Card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}
