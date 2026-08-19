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
import { createEmojiLoader, type ScheduleBackgroundTask } from "./utils/emoji";

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

function loadFontFromR2(
  bucket: R2Bucket,
  cacheKey: string,
  path: string
): Promise<ArrayBuffer> {
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const promise = bucket
    .get(path)
    .then(async (object) => {
      if (!object) {
        throw new Error(`Font not found in R2: ${path}`);
      }
      return object.arrayBuffer();
    })
    .catch((error) => {
      fontCache.delete(cacheKey);
      throw error;
    });

  fontCache.set(cacheKey, promise);
  return promise;
}

async function loadFont(
  bucket: R2Bucket,
  fontKey: FontKey
): Promise<ArrayBuffer> {
  const fontConfig = getFont(fontKey);
  return loadFontFromR2(bucket, fontConfig.r2Path, fontConfig.r2Path);
}

async function loadFontByConfig(
  bucket: R2Bucket,
  fontConfig: FontConfig
): Promise<ArrayBuffer> {
  return loadFontFromR2(bucket, fontConfig.r2Path, fontConfig.r2Path);
}

export function ensureInitialized(): Promise<void> {
  if (initialized) return Promise.resolve();
  if (!initializationPromise) {
    initializationPromise = init(yogaWasm)
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

export interface RenderOptions {
  bucket: R2Bucket;
  /** Emoji set to use for rendering emojis */
  emojiSet?: EmojiSetKey;
  font?: FontKey;
  height?: number;
  /** Whether content contains CJK characters that need fallback font */
  needsCjk?: boolean;
  /** Schedule non-critical cache writes after the response is ready. */
  scheduleBackgroundTask?: ScheduleBackgroundTask;
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
    scheduleBackgroundTask,
  } = options;

  const fontConfig = getFont(font);
  const fontsKey = `${font}:${needsCjk ? "cjk" : "latin"}`;
  let fontsPromise = fontOptionsCache.get(fontsKey);
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(bucket, font),
      needsCjk
        ? loadFontByConfig(bucket, CJK_FALLBACK_FONT)
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

  const [fonts] = await Promise.all([fontsPromise, ensureInitialized()]);

  // Create emoji loader for the specified emoji set
  const emojiLoader = createEmojiLoader(
    emojiSet,
    bucket,
    scheduleBackgroundTask
  );

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
  cacheSeconds = 172_800 // 48 hours default
): Response {
  return new Response(svg, {
    headers: {
      "Cache-Control": `public, max-age=${cacheSeconds}, stale-while-revalidate=3600`,
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
