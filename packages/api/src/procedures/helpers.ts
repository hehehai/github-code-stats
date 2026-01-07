import { env } from "cloudflare:workers";
import { generateCacheKey, getCachedSvg, setCachedSvg } from "../utils/cache";

const SVG_CONTENT_TYPE = "image/svg+xml; charset=utf-8";

/**
 * Get the R2 bucket from Cloudflare bindings
 */
export function getCacheBucket(): R2Bucket {
  return env.CACHE_BUCKET;
}

/**
 * Get the GitHub token from Cloudflare bindings
 */
export function getGitHubToken(): string {
  return env.GITHUB_TOKEN;
}

/**
 * Check R2 cache for existing SVG
 */
export async function checkCache(
  endpoint: string,
  params: Record<string, string>
): Promise<string | null> {
  const bucket = getCacheBucket();
  const cacheKey = await generateCacheKey(endpoint, params);
  return getCachedSvg(bucket, cacheKey);
}

/**
 * Create SVG Blob for oRPC OpenAPI response
 * oRPC will stream the Blob content with the correct Content-Type
 */
export function createSvgBlob(svg: string): Blob {
  return new Blob([svg], { type: SVG_CONTENT_TYPE });
}

/**
 * Cache SVG and return Blob for oRPC OpenAPI response
 */
export async function cacheAndReturnBlob(
  endpoint: string,
  params: Record<string, string>,
  svg: string
): Promise<Blob> {
  const bucket = getCacheBucket();
  const cacheKey = await generateCacheKey(endpoint, params);
  await setCachedSvg(bucket, cacheKey, svg);
  return createSvgBlob(svg);
}

/**
 * Convert procedure input to cache key params
 */
export function inputToParams(
  input: Record<string, unknown>
): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== null) {
      params[key] = Array.isArray(value) ? value.join(",") : String(value);
    }
  }
  return params;
}
