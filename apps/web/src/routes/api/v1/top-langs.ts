import { env, waitUntil } from "cloudflare:workers";
import { topLangsQuerySchema } from "@github-code-stats/api/schemas";
import { generateTopLangsCard } from "@github-code-stats/api/services";
import {
  createSvgResponse,
  generateCacheKey,
  getCachedSvg,
  NO_STORE_CACHE_CONTROL,
  setCachedSvg,
} from "@github-code-stats/api/utils/cache";
import { createFileRoute } from "@tanstack/react-router";

function parseQueryParams(url: URL): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    params[key] = value;
  }
  return params;
}

async function handleGet({ request }: { request: Request }) {
  const startedAt = performance.now();
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
      return createSvgResponse(cached, "HIT", startedAt);
    }
  }

  // Generate SVG
  const svg = await generateTopLangsCard(input, {
    bucket: env.CACHE_BUCKET,
    token: env.GITHUB_TOKEN,
    waitUntil,
  });

  // Cache result
  await setCachedSvg(env.CACHE_BUCKET, cacheKey, svg);

  return createSvgResponse(
    svg,
    "MISS",
    startedAt,
    input.refresh ? NO_STORE_CACHE_CONTROL : undefined
  );
}

export const Route = createFileRoute("/api/v1/top-langs")({
  server: {
    handlers: {
      GET: handleGet,
      HEAD: handleGet,
    },
  },
});
