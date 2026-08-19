import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/seo";

const staticRoutes = [
  { changefreq: "weekly", path: "/", priority: "1.0" },
  { changefreq: "monthly", path: "/about", priority: "0.8" },
  { changefreq: "weekly", path: "/doc", priority: "0.9" },
  { changefreq: "weekly", path: "/doc/stats", priority: "0.8" },
  { changefreq: "weekly", path: "/doc/top-langs", priority: "0.8" },
  { changefreq: "weekly", path: "/doc/pin", priority: "0.8" },
  { changefreq: "weekly", path: "/doc/gist", priority: "0.8" },
];

function generateSitemap(): string {
  const urls = staticRoutes
    .map(
      (route) => `  <url>
    <loc>${siteConfig.url}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

async function handleGet() {
  const xml = generateSitemap();

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: handleGet,
    },
  },
});
