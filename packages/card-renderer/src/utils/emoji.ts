import { EMOJI_SETS, type EmojiSetKey } from "../constants/emojis";

/**
 * Convert emoji to code point format
 * Example: "🚀" -> "1f680"
 */
function getEmojiCodePoint(emoji: string): string {
  const codePoints: string[] = [];
  for (const char of emoji) {
    const codePoint = char.codePointAt(0);
    // Skip variation selectors (FE0F, FE0E)
    if (codePoint && codePoint !== 0xfe_0f && codePoint !== 0xfe_0e) {
      codePoints.push(codePoint.toString(16));
    }
  }
  return codePoints.join("-");
}

// Cache for loaded emoji SVGs - keyed by emojiSet:emoji
const emojiCache = new Map<string, string>();
const emojiInflightCache = new Map<string, Promise<string>>();
const MAX_EMOJI_CACHE_SIZE = 256;

const EMOJI_R2_PREFIX = "emoji/v1";
const EMOJI_R2_CACHE_CONTROL = "public, max-age=31536000, immutable";

export type ScheduleBackgroundTask = (promise: Promise<unknown>) => void;

/**
 * Generate cache key for an emoji
 */
function getCacheKey(emojiSet: EmojiSetKey, emoji: string): string {
  return `${emojiSet}:${emoji}`;
}

function getR2Key(emojiSet: EmojiSetKey, code: string): string {
  return `${EMOJI_R2_PREFIX}/${emojiSet}/${code}.svg`;
}

function getCachedEmoji(cacheKey: string): string | undefined {
  const cached = emojiCache.get(cacheKey);
  if (cached) {
    // Keep frequently used Emoji near the end of the LRU map.
    emojiCache.delete(cacheKey);
    emojiCache.set(cacheKey, cached);
  }
  return cached;
}

function cacheEmoji(cacheKey: string, dataUrl: string): void {
  emojiCache.delete(cacheKey);
  emojiCache.set(cacheKey, dataUrl);

  while (emojiCache.size > MAX_EMOJI_CACHE_SIZE) {
    const oldestKey = emojiCache.keys().next().value;
    if (oldestKey === undefined) break;
    emojiCache.delete(oldestKey);
  }
}

function toDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

async function loadEmojiFromCdn(
  emoji: string,
  emojiSet: EmojiSetKey,
  code: string,
  bucket?: R2Bucket,
  scheduleBackgroundTask?: ScheduleBackgroundTask
): Promise<string> {
  const config = EMOJI_SETS[emojiSet];

  try {
    const response = await fetch(config.getUrl(code));
    if (!response.ok) {
      if (emojiSet !== "twitter") {
        return loadEmojiWithBucket(
          emoji,
          "twitter",
          bucket,
          scheduleBackgroundTask
        );
      }
      return "";
    }

    const svg = await response.text();
    if (bucket) {
      const persistPromise = bucket
        .put(getR2Key(emojiSet, code), svg, {
          httpMetadata: {
            cacheControl: EMOJI_R2_CACHE_CONTROL,
            contentType: "image/svg+xml",
          },
        })
        .catch(() => undefined);
      if (scheduleBackgroundTask) {
        scheduleBackgroundTask(persistPromise);
      } else {
        await persistPromise;
      }
    }

    return toDataUrl(svg);
  } catch {
    if (emojiSet !== "twitter") {
      return loadEmojiWithBucket(
        emoji,
        "twitter",
        bucket,
        scheduleBackgroundTask
      );
    }
    return "";
  }
}

async function loadEmojiWithBucket(
  emoji: string,
  emojiSet: EmojiSetKey,
  bucket?: R2Bucket,
  scheduleBackgroundTask?: ScheduleBackgroundTask
): Promise<string> {
  const cacheKey = getCacheKey(emojiSet, emoji);
  const cached = getCachedEmoji(cacheKey);
  if (cached) return cached;

  const inflight = emojiInflightCache.get(cacheKey);
  if (inflight) return inflight;

  const code = getEmojiCodePoint(emoji);
  const promise = (async () => {
    if (bucket) {
      try {
        const object = await bucket.get(getR2Key(emojiSet, code));
        if (object) {
          const dataUrl = toDataUrl(await object.text());
          cacheEmoji(cacheKey, dataUrl);
          return dataUrl;
        }
      } catch {
        // A persistent-cache read must never block the CDN fallback.
      }
    }

    const dataUrl = await loadEmojiFromCdn(
      emoji,
      emojiSet,
      code,
      bucket,
      scheduleBackgroundTask
    );
    if (dataUrl) cacheEmoji(cacheKey, dataUrl);
    return dataUrl;
  })().finally(() => {
    emojiInflightCache.delete(cacheKey);
  });

  emojiInflightCache.set(cacheKey, promise);
  return promise;
}

/**
 * Load emoji as base64 SVG data URL from the specified emoji set CDN
 */
export async function loadEmoji(
  emoji: string,
  emojiSet: EmojiSetKey = "twitter"
): Promise<string> {
  return loadEmojiWithBucket(emoji, emojiSet);
}

/**
 * Create an emoji loader function for a specific emoji set
 * This is useful for passing to Satori's loadAdditionalAsset
 */
export function createEmojiLoader(
  emojiSet: EmojiSetKey = "twitter",
  bucket?: R2Bucket,
  scheduleBackgroundTask?: ScheduleBackgroundTask
): (emoji: string) => Promise<string> {
  return (emoji: string) =>
    loadEmojiWithBucket(emoji, emojiSet, bucket, scheduleBackgroundTask);
}

/**
 * Clear the emoji cache
 */
export function clearEmojiCache(): void {
  emojiCache.clear();
  emojiInflightCache.clear();
}

/**
 * Get emoji cache size (for debugging)
 */
export function getEmojiCacheSize(): number {
  return emojiCache.size;
}
