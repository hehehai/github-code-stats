import { env } from "cloudflare:workers";
import { gistQuerySchema } from "@github-code-stats/api/schemas";
import { generateGistCard } from "@github-code-stats/api/services";
import {
  generateCacheKey,
  getCachedSvg,
  setCachedSvg,
} from "@github-code-stats/api/utils/cache";
import { createFileRoute } from "@tanstack/react-router";

const SVG_HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "public, max-age=14400",
};

function parseQueryParams(url: URL): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    params[key] = value;
  }
  return params;
}

async function handleGet({ request }: { request: Request }) {
  const url = new URL(request.url);
  const params = parseQueryParams(url);

  // Validate input
  const parseResult = gistQuerySchema.safeParse(params);
  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.issues }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const input = parseResult.data;

  const cacheKey = await generateCacheKey("api-gist", params);
  // Check cache
  if (!input.refresh) {
    const cached = await getCachedSvg(env.CACHE_BUCKET, cacheKey);
    if (cached) {
      return new Response(cached, { headers: SVG_HEADERS });
    }
  }

  // Generate SVG
  const svg = await generateGistCard(input, {
    bucket: env.CACHE_BUCKET,
    token: env.GITHUB_TOKEN,
  });

  // Cache result
  await setCachedSvg(env.CACHE_BUCKET, cacheKey, svg);

  return new Response(svg, { headers: SVG_HEADERS });
}

export const Route = createFileRoute("/api/v1/gist")({
  server: {
    handlers: {
      GET: handleGet,
      HEAD: handleGet,
    },
  },
});
