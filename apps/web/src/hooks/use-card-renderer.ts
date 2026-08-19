import type { EmojiSetKey, FontKey } from "@github-code-stats/card-renderer";
import { containsCjk } from "@github-code-stats/card-renderer/cjk";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type BrowserRenderer =
  typeof import("@github-code-stats/card-renderer/browser")["renderToSvgBrowser"];

let browserRendererPromise: Promise<BrowserRenderer> | null = null;

function loadBrowserRenderer(): Promise<BrowserRenderer> {
  browserRendererPromise ??= import(
    "@github-code-stats/card-renderer/browser"
  ).then((module) => module.renderToSvgBrowser);
  return browserRendererPromise;
}

export interface UseCardRendererOptions {
  /** Emoji set to use for rendering emojis */
  emojiSet?: EmojiSetKey;
  font?: FontKey;
  height?: number;
  /** Text content to check for CJK characters */
  textContent?: string;
  width?: number;
}

export interface UseCardRendererResult {
  error: Error | null;
  isLoading: boolean;
  svg: string | null;
}

const RENDER_DEBOUNCE_MS = 180;

export function useCardRenderer(
  element: ReactNode | null,
  options: UseCardRendererOptions = {}
): UseCardRendererResult {
  const [svg, setSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const needsCjk = options.textContent
    ? containsCjk(options.textContent)
    : false;

  useEffect(() => {
    if (!element) {
      setSvg(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setSvg(null);
    setIsLoading(true);
    setError(null);

    const timeoutId = window.setTimeout(() => {
      loadBrowserRenderer()
        .then((renderToSvgBrowser) =>
          renderToSvgBrowser(element, {
            ...options,
            emojiSet: options.emojiSet ?? "twitter",
            needsCjk,
          })
        )
        .then((result: string) => {
          if (!cancelled) {
            setSvg(result);
            setIsLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setIsLoading(false);
          }
        });
    }, RENDER_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [
    element,
    options.width,
    options.height,
    options.font,
    options.emojiSet,
    needsCjk,
  ]);

  return { error, isLoading, svg };
}
