const CACHE_PREFIX = "c_";
export const SVG_CACHE_CONTROL =
  "public, max-age=172800, stale-while-revalidate=3600";
export const NO_STORE_CACHE_CONTROL = "no-store";

/**
 * Generate a hash from a string using Web Crypto API
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generate a cache key from endpoint and query parameters
 */
export async function generateCacheKey(
  endpoint: string,
  params: Record<string, string>
): Promise<string> {
  // Remove refresh param from cache key
  const { refresh: _, ...cacheParams } = params;

  // Sort params alphabetically for consistent hashing
  const sortedKeys = Object.keys(cacheParams).sort();
  const sortedParams: Record<string, string> = {};
  for (const key of sortedKeys) {
    const value = cacheParams[key];
    if (value !== undefined) {
      sortedParams[key] = value;
    }
  }

  const paramsString = JSON.stringify(sortedParams);
  const hash = await hashString(paramsString);

  // Clean endpoint name (remove leading slash)
  const cleanEndpoint = endpoint.replace(/^\//, "").replace(/\//g, "-");

  return `${CACHE_PREFIX}${cleanEndpoint}_${hash}.svg`;
}

/**
 * Get cached SVG from R2 bucket
 */
export async function getCachedSvg(
  bucket: R2Bucket,
  key: string
): Promise<string | null> {
  try {
    const object = await bucket.get(key);
    if (!object) return null;
    return await object.text();
  } catch {
    return null;
  }
}

/**
 * Store SVG to R2 cache
 */
export async function setCachedSvg(
  bucket: R2Bucket,
  key: string,
  svg: string
): Promise<void> {
  await bucket.put(key, svg, {
    httpMetadata: {
      cacheControl: SVG_CACHE_CONTROL,
      contentType: "image/svg+xml; charset=utf-8",
    },
  });
}

export function createSvgResponse(
  svg: string,
  cacheStatus: "HIT" | "MISS",
  startedAt: number,
  cacheControl = SVG_CACHE_CONTROL
): Response {
  const duration = Math.max(0, Math.round(performance.now() - startedAt));

  return new Response(svg, {
    headers: {
      "Cache-Control": cacheControl,
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Server-Timing": `origin;dur=${duration}`,
      "X-Image-Cache": `R2-${cacheStatus}`,
    },
  });
}
