import type { ReactNode } from "react";
import satori, { init } from "satori/standalone";

import type { EmojiSetKey } from "./constants/emojis";
import {
  CJK_FALLBACK_FONT,
  DEFAULT_FONT,
  type FontKey,
  getFont,
} from "./constants/fonts";
import { createEmojiLoader } from "./utils/emoji";

let initialized = false;
const fontCache = new Map<string, ArrayBuffer>();

// Load yoga WASM from CDN for browser
async function loadYogaWasm(): Promise<ArrayBuffer> {
  const response = await fetch("https://unpkg.com/satori@0.29.0/yoga.wasm");
  return response.arrayBuffer();
}

async function loadFontFromCdn(fontKey: FontKey): Promise<ArrayBuffer> {
  const cached = fontCache.get(fontKey);
  if (cached) return cached;

  const fontConfig = getFont(fontKey);
  // Load from jsDelivr CDN
  const response = await fetch(fontConfig.cdnUrl);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${fontConfig.name}`);
  }
  const data = await response.arrayBuffer();

  fontCache.set(fontKey, data);
  return data;
}

async function loadCjkFallbackFont(): Promise<ArrayBuffer> {
  const cacheKey = "cjk-fallback";
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const response = await fetch(CJK_FALLBACK_FONT.cdnUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to load CJK fallback font: ${CJK_FALLBACK_FONT.name}`
    );
  }
  const data = await response.arrayBuffer();

  fontCache.set(cacheKey, data);
  return data;
}

export async function ensureBrowserInitialized(): Promise<void> {
  if (!initialized) {
    const yogaWasm = await loadYogaWasm();
    await init(yogaWasm);
    initialized = true;
  }
}

export interface BrowserRenderOptions {
  /** Emoji set to use for rendering emojis */
  emojiSet?: EmojiSetKey;
  font?: FontKey;
  height?: number;
  /** Whether content contains CJK characters that need fallback font */
  needsCjk?: boolean;
  width?: number;
}

export async function renderToSvgBrowser(
  element: ReactNode,
  options: BrowserRenderOptions = {}
): Promise<string> {
  const {
    width = 495,
    height = 195,
    font = DEFAULT_FONT,
    needsCjk = false,
    emojiSet = "twitter",
  } = options;

  await ensureBrowserInitialized();

  const fontConfig = getFont(font);
  const fontData = await loadFontFromCdn(font);

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
    const cjkFontData = await loadCjkFallbackFont();
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
