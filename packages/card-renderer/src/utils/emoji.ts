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

/**
 * Generate cache key for an emoji
 */
function getCacheKey(emojiSet: EmojiSetKey, emoji: string): string {
  return `${emojiSet}:${emoji}`;
}

/**
 * Load emoji as base64 SVG data URL from the specified emoji set CDN
 */
export async function loadEmoji(
  emoji: string,
  emojiSet: EmojiSetKey = "twitter"
): Promise<string> {
  const cacheKey = getCacheKey(emojiSet, emoji);
  const cached = emojiCache.get(cacheKey);
  if (cached) return cached;

  const code = getEmojiCodePoint(emoji);
  const config = EMOJI_SETS[emojiSet];
  const url = config.getUrl(code);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Fallback to twitter if the emoji is not found in the current set
      if (emojiSet !== "twitter") {
        return loadEmoji(emoji, "twitter");
      }
      return "";
    }

    const svg = await response.text();
    const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

    emojiCache.set(cacheKey, dataUrl);
    return dataUrl;
  } catch {
    // Fallback to twitter if there's an error
    if (emojiSet !== "twitter") {
      return loadEmoji(emoji, "twitter");
    }
    return "";
  }
}

/**
 * Create an emoji loader function for a specific emoji set
 * This is useful for passing to Satori's loadAdditionalAsset
 */
export function createEmojiLoader(
  emojiSet: EmojiSetKey = "twitter"
): (emoji: string) => Promise<string> {
  return (emoji: string) => loadEmoji(emoji, emojiSet);
}

/**
 * Clear the emoji cache
 */
export function clearEmojiCache(): void {
  emojiCache.clear();
}

/**
 * Get emoji cache size (for debugging)
 */
export function getEmojiCacheSize(): number {
  return emojiCache.size;
}
