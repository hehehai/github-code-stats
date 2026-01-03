import type { ReactNode } from "react";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import { DEFAULT_FONT, type FontKey, getFont } from "../constants/fonts";
import yogaWasm from "../vendors/yoga.wasm";

let initialized = false;
const fontCache = new Map<string, ArrayBuffer>();

// CDN URL for fonts (used in dev when R2 is not available)
const FONT_CDN_BASE = "https://cdn.jsdelivr.net/fontsource/fonts";

async function loadFont(
  bucket: R2Bucket | null,
  fontKey: FontKey
): Promise<ArrayBuffer> {
  const cached = fontCache.get(fontKey);
  if (cached) return cached;

  const fontConfig = getFont(fontKey);

  let data: ArrayBuffer;

  if (bucket) {
    // Production: Load from R2
    const object = await bucket.get(fontConfig.r2Path);
    if (!object) {
      throw new Error(`Font not found in R2: ${fontConfig.r2Path}`);
    }
    data = await object.arrayBuffer();
  } else {
    // Dev: Load from CDN
    const cdnUrl = `${FONT_CDN_BASE}/${fontConfig.family.toLowerCase().replace(/\s+/g, "-")}@latest/latin-400-normal.woff`;
    const response = await fetch(cdnUrl);
    if (!response.ok) {
      throw new Error(`Failed to load font from CDN: ${cdnUrl}`);
    }
    data = await response.arrayBuffer();
  }

  fontCache.set(fontKey, data);
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
  bucket: R2Bucket | null;
}

export async function renderToSvg(
  element: ReactNode,
  options: RenderOptions
): Promise<string> {
  const { width = 495, height = 195, font = DEFAULT_FONT, bucket } = options;

  await ensureInitialized();
  const fontData = await loadFont(bucket, font);
  const fontConfig = getFont(font);

  const svg = await satori(element, {
    width,
    height,
    fonts: [
      {
        name: fontConfig.family,
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
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
