export const siteConfig = {
  description:
    "Generate beautiful, customizable SVG cards for your GitHub profile. Display your stats, top languages, pinned repos, and gists.",
  locale: "en_US",
  name: "GitHub Code Stats",
  themeColor: "#000000",
  url: "https://github.actnow.dev",
};

interface MetaOptions {
  description?: string;
  path?: string;
  title?: string;
}

export function createPageMeta({
  title,
  description = siteConfig.description,
  path = "",
}: MetaOptions) {
  const pageTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    links: [{ href: canonicalUrl, rel: "canonical" }],
    meta: [
      { title: pageTitle },
      { content: description, name: "description" },
      // Open Graph
      { content: pageTitle, property: "og:title" },
      { content: description, property: "og:description" },
      { content: "website", property: "og:type" },
      { content: canonicalUrl, property: "og:url" },
      { content: siteConfig.name, property: "og:site_name" },
      { content: siteConfig.locale, property: "og:locale" },
      // Twitter Card
      { content: "summary", name: "twitter:card" },
      { content: pageTitle, name: "twitter:title" },
      { content: description, name: "twitter:description" },
    ],
  };
}
