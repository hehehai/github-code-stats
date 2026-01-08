// Emoji set definitions for different emoji libraries

export type EmojiSetKey = "twitter" | "openmoji" | "noto" | "fluent";

export interface EmojiSetConfig {
  name: string;
  cdn: string;
  // Function to generate the SVG URL from emoji code point
  getUrl: (codePoint: string) => string;
}

export const EMOJI_SETS: Record<EmojiSetKey, EmojiSetConfig> = {
  twitter: {
    name: "Twitter",
    cdn: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg",
    getUrl: (code) =>
      `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`,
  },
  openmoji: {
    name: "OpenMoji",
    cdn: "https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg",
    getUrl: (code) =>
      `https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/${code.toUpperCase()}.svg`,
  },
  noto: {
    name: "NotoEmoji",
    cdn: "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji/svg",
    getUrl: (code) =>
      `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji/svg/emoji_u${code.replace(/-/g, "_")}.svg`,
  },
  fluent: {
    name: "FluentEmojiFlat",
    cdn: "https://cdn.jsdelivr.net/npm/@iconify/json/json/fluent-emoji-flat.json",
    getUrl: (code) =>
      `https://api.iconify.design/fluent-emoji-flat/${code}.svg`,
  },
} as const;

/**
 * Get available emoji sets as array for UI
 */
export function getAvailableEmojiSets(): Array<{
  value: EmojiSetKey;
  label: string;
}> {
  return Object.entries(EMOJI_SETS).map(([key, config]) => ({
    value: key as EmojiSetKey,
    label: config.name,
  }));
}
