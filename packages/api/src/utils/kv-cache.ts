import { env } from "cloudflare:workers";

// Cache TTL: 24 hours in seconds
const CACHE_TTL = 24 * 60 * 60;

function getCacheKv(): KVNamespace | null {
  const kv = (env as { USER_CACHE: KVNamespace }).USER_CACHE;
  console.info("[kv-cache] USER_CACHE binding:", kv ? "exists" : "undefined");
  return kv ?? null;
}

/**
 * Get cached data from KV
 */
export async function getCachedData<T>(key: string): Promise<T | null> {
  console.info("[kv-cache] Getting:", key);
  const kv = getCacheKv();
  if (!kv) {
    console.error("[kv-cache] KV namespace is undefined!");
    return null;
  }
  const data = await kv.get(key, "json");
  console.info("[kv-cache] Get result:", data ? "found" : "not found");
  return data as T | null;
}

/**
 * Set data to KV cache with TTL
 */
export async function setCachedData<T>(key: string, data: T): Promise<void> {
  console.info("[kv-cache] Setting:", key);
  const kv = getCacheKv();
  if (!kv) {
    console.error("[kv-cache] KV namespace is undefined, skipping set");
    return;
  }
  await kv.put(key, JSON.stringify(data), { expirationTtl: CACHE_TTL });
  console.info("[kv-cache] Set complete");
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
