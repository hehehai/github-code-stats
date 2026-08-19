import { env } from "cloudflare:workers";
import { topLangsQuerySchema } from "@github-code-stats/api/schemas";
import { generateTopLangsCard } from "@github-code-stats/api/services";
import {
  generateCacheKey,
  getCachedSvg,
  setCachedSvg,
} from "@github-code-stats/api/utils/cache";
import { createFileRoute } from "@tanstack/react-router";

const SVG_HEADERS = {
  "Cache-Control": "public, max-age=14400",
  "Content-Type": "image/svg+xml; charset=utf-8",
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
  const parseResult = topLangsQuerySchema.safeParse(params);
  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.issues }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
  const input = parseResult.data;

  const cacheKey = await generateCacheKey("api-top-langs", params);
  // Check cache
  if (!input.refresh) {
    const cached = await getCachedSvg(env.CACHE_BUCKET, cacheKey);
    if (cached) {
      return new Response(cached, { headers: SVG_HEADERS });
    }
  }

  // Generate SVG
  const svg = await generateTopLangsCard(input, {
    bucket: env.CACHE_BUCKET,
    token: env.GITHUB_TOKEN,
  });

  // Cache result
  await setCachedSvg(env.CACHE_BUCKET, cacheKey, svg);

  return new Response(svg, { headers: SVG_HEADERS });
}

export const Route = createFileRoute("/api/v1/top-langs")({
  server: {
    handlers: {
      GET: handleGet,
      HEAD: handleGet,
    },
  },
});
