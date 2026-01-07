import { env } from "cloudflare:workers";
import { statsQuerySchema } from "@github-code-stats/api/schemas";
import { generateStatsCard } from "@github-code-stats/api/services";
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

  console.info("[stats] Request params:", JSON.stringify(params));

  // Validate input
  const parseResult = statsQuerySchema.safeParse(params);
  if (!parseResult.success) {
    console.error(
      "[stats] Validation failed:",
      JSON.stringify(parseResult.error.issues)
    );
    return new Response(JSON.stringify({ error: parseResult.error.issues }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const input = parseResult.data;

  console.info("[stats] Validation passed, checking cache...");

  // Check cache
  if (!input.refresh) {
    const cacheKey = await generateCacheKey("api-stats", params);
    const cached = await getCachedSvg(env.CACHE_BUCKET, cacheKey);
    if (cached) {
      console.info("[stats] Cache hit:", cacheKey);
      return new Response(cached, { headers: SVG_HEADERS });
    }
    console.info("[stats] Cache miss:", cacheKey);
  }

  try {
    console.info("[stats] Generating SVG...");
    // Generate SVG
    const svg = await generateStatsCard(input, {
      bucket: env.CACHE_BUCKET,
      token: env.GITHUB_TOKEN,
    });
    console.info("[stats] SVG generated successfully");

    // Cache result
    const cacheKey = await generateCacheKey("api-stats", params);
    await setCachedSvg(env.CACHE_BUCKET, cacheKey, svg);
    console.info("[stats] SVG cached:", cacheKey);

    return new Response(svg, { headers: SVG_HEADERS });
  } catch (error) {
    console.error("[stats] Error generating SVG:", error);
    throw error;
  }
}

export const Route = createFileRoute("/api/v1/")({
  server: {
    handlers: {
      GET: handleGet,
      HEAD: handleGet,
    },
  },
});
