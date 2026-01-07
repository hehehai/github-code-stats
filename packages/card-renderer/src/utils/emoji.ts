// Twemoji CDN base URL
const TWEMOJI_CDN =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

/**
 * Convert emoji to Twemoji CDN URL code point format
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

// Cache for loaded emoji SVGs
const emojiCache = new Map<string, string>();

/**
 * Load emoji as base64 SVG data URL from Twemoji CDN
 */
export async function loadEmoji(emoji: string): Promise<string> {
  const cached = emojiCache.get(emoji);
  if (cached) return cached;

  const code = getEmojiCodePoint(emoji);
  const url = `${TWEMOJI_CDN}/${code}.svg`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return "";
    }

    const svg = await response.text();
    const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

    emojiCache.set(emoji, dataUrl);
    return dataUrl;
  } catch {
    return "";
  }
}
