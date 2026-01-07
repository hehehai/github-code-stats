import { env } from "cloudflare:workers";

// Cache TTL: 24 hours in seconds
const CACHE_TTL = 24 * 60 * 60;

function getCacheKv(): KVNamespace {
  return (env as { USER_CACHE: KVNamespace }).USER_CACHE;
}

/**
 * Get cached data from KV
 */
export async function getCachedData<T>(key: string): Promise<T | null> {
  const kv = getCacheKv();
  const data = await kv.get(key, "json");
  return data as T | null;
}

/**
 * Set data to KV cache with TTL
 */
export async function setCachedData<T>(key: string, data: T): Promise<void> {
  const kv = getCacheKv();
  await kv.put(key, JSON.stringify(data), { expirationTtl: CACHE_TTL });
}

/**
 * Generate a cache key from prefix and params
 */
export function generateCacheKey(
  prefix: string,
  params: Record<string, unknown>
): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `${prefix}:${sorted}`;
}
