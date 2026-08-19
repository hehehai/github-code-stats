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
let initializationPromise: Promise<void> | null = null;
const fontCache = new Map<string, Promise<ArrayBuffer>>();

type SatoriFont = {
  data: ArrayBuffer;
  name: string;
  style: "normal";
  weight: 400;
};

const fontOptionsCache = new Map<string, Promise<SatoriFont[]>>();

// Load yoga WASM from CDN for browser
async function loadYogaWasm(): Promise<ArrayBuffer> {
  const response = await fetch("https://unpkg.com/satori@0.29.0/yoga.wasm");
  return response.arrayBuffer();
}

async function loadFontFromCdn(fontKey: FontKey): Promise<ArrayBuffer> {
  const cached = fontCache.get(fontKey);
  if (cached) return cached;

  const fontConfig = getFont(fontKey);
  const promise = fetch(fontConfig.cdnUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load font: ${fontConfig.name}`);
      }
      return response.arrayBuffer();
    })
    .catch((error) => {
      fontCache.delete(fontKey);
      throw error;
    });

  fontCache.set(fontKey, promise);
  return promise;
}

async function loadCjkFallbackFont(): Promise<ArrayBuffer> {
  const cacheKey = "cjk-fallback";
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const promise = fetch(CJK_FALLBACK_FONT.cdnUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load CJK fallback font: ${CJK_FALLBACK_FONT.name}`
        );
      }
      return response.arrayBuffer();
    })
    .catch((error) => {
      fontCache.delete(cacheKey);
      throw error;
    });

  fontCache.set(cacheKey, promise);
  return promise;
}

export function ensureBrowserInitialized(): Promise<void> {
  if (initialized) return Promise.resolve();
  if (!initializationPromise) {
    initializationPromise = loadYogaWasm()
      .then((yogaWasm) => init(yogaWasm))
      .then(() => {
        initialized = true;
      })
      .catch((error) => {
        initializationPromise = null;
        throw error;
      });
  }
  return initializationPromise;
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

  const fontConfig = getFont(font);
  const fontsKey = `${font}:${needsCjk ? "cjk" : "latin"}`;
  let fontsPromise = fontOptionsCache.get(fontsKey);
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFontFromCdn(font),
      needsCjk
        ? loadCjkFallbackFont()
        : Promise.resolve<ArrayBuffer | undefined>(undefined),
    ])
      .then(([fontData, cjkFontData]) => {
        const fonts: SatoriFont[] = [
          {
            data: fontData,
            name: fontConfig.family,
            style: "normal",
            weight: 400,
          },
        ];
        if (cjkFontData) {
          fonts.push({
            data: cjkFontData,
            name: CJK_FALLBACK_FONT.family,
            style: "normal",
            weight: 400,
          });
        }
        return fonts;
      })
      .catch((error) => {
        fontOptionsCache.delete(fontsKey);
        throw error;
      });
    fontOptionsCache.set(fontsKey, fontsPromise);
  }

  const [fonts] = await Promise.all([fontsPromise, ensureBrowserInitialized()]);

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
