import { containsCjk, type FontKey } from "@github-code-stats/card-renderer";
import { renderToSvgBrowser } from "@github-code-stats/card-renderer/browser";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export interface UseCardRendererOptions {
  width?: number;
  height?: number;
  font?: FontKey;
  /** Text content to check for CJK characters */
  textContent?: string;
}

export interface UseCardRendererResult {
  svg: string | null;
  isLoading: boolean;
  error: Error | null;
}

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
    setIsLoading(true);
    setError(null);

    renderToSvgBrowser(element, { ...options, needsCjk })
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

    return () => {
      cancelled = true;
    };
  }, [element, options.width, options.height, options.font, needsCjk]);

  return { svg, isLoading, error };
}
