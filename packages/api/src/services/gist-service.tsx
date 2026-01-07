import type { z } from "zod";
import { GistCard } from "../cards/gist-card";
import { getFont } from "../constants/fonts";
import { fetchGist } from "../fetchers/repo";
import type { gistQuerySchema } from "../schemas";
import { getTheme, mergeTheme, normalizeColor } from "../themes";
import { containsCjk, renderToSvg } from "../utils/renderer";

export type GistInput = z.infer<typeof gistQuerySchema>;

export interface GistServiceDeps {
  bucket: R2Bucket;
  token: string;
}

export async function generateGistCard(
  input: GistInput,
  deps: GistServiceDeps
): Promise<string> {
  // Parse theme
  const baseTheme = getTheme(input.theme);
  const theme = mergeTheme(baseTheme, {
    titleColor: normalizeColor(input.title_color),
    textColor: normalizeColor(input.text_color),
    iconColor: normalizeColor(input.icon_color),
    bgColor: normalizeColor(input.bg_color),
    borderColor: normalizeColor(input.border_color),
  });

  // Parse font
  const fontKey = input.font;
  const fontConfig = getFont(fontKey);

  // Fetch gist data
  const gistData = await fetchGist(input.id, deps.token);

  // Check if gist description contains CJK characters
  const needsCjk = containsCjk(gistData.description ?? "");

  // Render SVG
  const svg = await renderToSvg(
    <GistCard
      fontFamily={fontConfig.family}
      gist={gistData}
      hideBorder={input.hide_border ?? false}
      theme={theme}
    />,
    {
      width: 400,
      height: 120,
      font: fontKey,
      bucket: deps.bucket,
      needsCjk,
    }
  );

  return svg;
}
