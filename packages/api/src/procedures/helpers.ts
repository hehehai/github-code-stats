import { env } from "cloudflare:workers";
import { generateCacheKey, getCachedSvg, setCachedSvg } from "../utils/cache";

export interface SvgResponse {
  headers: Record<string, string>;
  body: string;
}

const SVG_HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "public, max-age=14400",
};

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
 * Create SVG response object for oRPC
 */
export function createSvgResponseObj(svg: string): SvgResponse {
  return {
    headers: SVG_HEADERS,
    body: svg,
  };
}

/**
 * Cache SVG and return response object
 */
export async function cacheAndReturn(
  endpoint: string,
  params: Record<string, string>,
  svg: string
): Promise<SvgResponse> {
  const bucket = getCacheBucket();
  const cacheKey = await generateCacheKey(endpoint, params);
  await setCachedSvg(bucket, cacheKey, svg);
  return createSvgResponseObj(svg);
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
