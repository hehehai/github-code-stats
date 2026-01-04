import type { ReactNode } from "react";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";

import { DEFAULT_FONT, type FontKey, getFont } from "./constants/fonts";

let initialized = false;
const fontCache = new Map<string, ArrayBuffer>();

// Load yoga WASM from CDN for browser
async function loadYogaWasm(): Promise<ArrayBuffer> {
  const response = await fetch(
    "https://unpkg.com/yoga-wasm-web@0.3.3/dist/yoga.wasm"
  );
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

export async function ensureBrowserInitialized(): Promise<void> {
  if (!initialized) {
    const yogaWasm = await loadYogaWasm();
    const yoga = await initYoga(yogaWasm);
    init(yoga);
    initialized = true;
  }
}

export interface BrowserRenderOptions {
  width?: number;
  height?: number;
  font?: FontKey;
}

export async function renderToSvgBrowser(
  element: ReactNode,
  options: BrowserRenderOptions = {}
): Promise<string> {
  const { width = 495, height = 195, font = DEFAULT_FONT } = options;

  await ensureBrowserInitialized();
  const fontData = await loadFontFromCdn(font);
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
