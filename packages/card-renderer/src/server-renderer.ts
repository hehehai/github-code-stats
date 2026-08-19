import type { ReactNode } from "react";
import satori, { init } from "satori/standalone";
import yogaWasm from "satori/yoga.wasm";

import type { EmojiSetKey } from "./constants/emojis";
import {
  CJK_FALLBACK_FONT,
  DEFAULT_FONT,
  type FontConfig,
  type FontKey,
  getFont,
} from "./constants/fonts";
import { createEmojiLoader } from "./utils/emoji";

let initialized = false;
const fontCache = new Map<string, ArrayBuffer>();

async function loadFont(
  bucket: R2Bucket,
  fontKey: FontKey
): Promise<ArrayBuffer> {
  const cached = fontCache.get(fontKey);
  if (cached) return cached;

  const fontConfig = getFont(fontKey);

  const object = await bucket.get(fontConfig.r2Path);
  if (!object) {
    throw new Error(`Font not found in R2: ${fontConfig.r2Path}`);
  }
  const data = await object.arrayBuffer();

  fontCache.set(fontKey, data);
  return data;
}

async function loadFontByConfig(
  bucket: R2Bucket,
  fontConfig: FontConfig
): Promise<ArrayBuffer> {
  const cacheKey = fontConfig.r2Path;
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const object = await bucket.get(fontConfig.r2Path);
  if (!object) {
    throw new Error(`Font not found in R2: ${fontConfig.r2Path}`);
  }
  const data = await object.arrayBuffer();

  fontCache.set(cacheKey, data);
  return data;
}

export async function ensureInitialized(): Promise<void> {
  if (!initialized) {
    await init(yogaWasm);
    initialized = true;
  }
}

export interface RenderOptions {
  bucket: R2Bucket;
  /** Emoji set to use for rendering emojis */
  emojiSet?: EmojiSetKey;
  font?: FontKey;
  height?: number;
  /** Whether content contains CJK characters that need fallback font */
  needsCjk?: boolean;
  width?: number;
}

export async function renderToSvg(
  element: ReactNode,
  options: RenderOptions
): Promise<string> {
  const {
    width = 495,
    height = 195,
    font = DEFAULT_FONT,
    bucket,
    needsCjk = false,
    emojiSet = "twitter",
  } = options;

  await ensureInitialized();

  const fontConfig = getFont(font);
  const fontData = await loadFont(bucket, font);

  const fonts = [
    {
      data: fontData,
      name: fontConfig.family,
      style: "normal" as const,
      weight: 400 as const,
    },
  ];

  // Only load CJK font if content contains CJK characters
  if (needsCjk) {
    const cjkFontData = await loadFontByConfig(bucket, CJK_FALLBACK_FONT);
    fonts.push({
      data: cjkFontData,
      name: CJK_FALLBACK_FONT.family,
      style: "normal" as const,
      weight: 400 as const,
    });
  }

  // Create emoji loader for the specified emoji set
  const emojiLoader = createEmojiLoader(emojiSet);

  const svg = await satori(element, {
    fonts,
    height,
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        return emojiLoader(segment);
      }
      return "";
    },
    width,
  });

  return svg;
}

export function createSvgResponse(
  svg: string,
  cacheSeconds = 14_400 // 4 hours default
): Response {
  return new Response(svg, {
    headers: {
      "Cache-Control": `public, max-age=${cacheSeconds}`,
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
