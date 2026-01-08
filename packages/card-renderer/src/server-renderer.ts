import type { ReactNode } from "react";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import type { EmojiSetKey } from "./constants/emojis";
import {
  CJK_FALLBACK_FONT,
  DEFAULT_FONT,
  type FontConfig,
  type FontKey,
  getFont,
} from "./constants/fonts";
import { createEmojiLoader } from "./utils/emoji";
import yogaWasm from "./vendors/yoga.wasm";

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
    const yoga = await initYoga(yogaWasm);
    init(yoga);
    initialized = true;
  }
}

export interface RenderOptions {
  width?: number;
  height?: number;
  font?: FontKey;
  bucket: R2Bucket;
  /** Whether content contains CJK characters that need fallback font */
  needsCjk?: boolean;
  /** Emoji set to use for rendering emojis */
  emojiSet?: EmojiSetKey;
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
      name: fontConfig.family,
      data: fontData,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];

  // Only load CJK font if content contains CJK characters
  if (needsCjk) {
    const cjkFontData = await loadFontByConfig(bucket, CJK_FALLBACK_FONT);
    fonts.push({
      name: CJK_FALLBACK_FONT.family,
      data: cjkFontData,
      weight: 400 as const,
      style: "normal" as const,
    });
  }

  // Create emoji loader for the specified emoji set
  const emojiLoader = createEmojiLoader(emojiSet);

  const svg = await satori(element, {
    width,
    height,
    fonts,
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        return emojiLoader(segment);
      }
      return "";
    },
  });

  return svg;
}

export function createSvgResponse(
  svg: string,
  cacheSeconds = 14_400 // 4 hours default
): Response {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": `public, max-age=${cacheSeconds}`,
    },
  });
}
