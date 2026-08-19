import type { z } from "zod";
import { LanguagesCard } from "../cards/languages-card";
import { getFont } from "../constants/fonts";
import { fetchLanguages } from "../fetchers/languages";
import type { topLangsQuerySchema } from "../schemas";
import { getTheme, mergeTheme, normalizeColor } from "../themes";
import { renderToSvg } from "../utils/renderer";

export type TopLangsInput = z.infer<typeof topLangsQuerySchema>;

export interface TopLangsServiceDeps {
  bucket: R2Bucket;
  token: string;
  waitUntil?: (promise: Promise<unknown>) => void;
}

export async function generateTopLangsCard(
  input: TopLangsInput,
  deps: TopLangsServiceDeps
): Promise<string> {
  // Parse theme
  const baseTheme = getTheme(input.theme);
  const theme = mergeTheme(baseTheme, {
    bgColor: normalizeColor(input.bg_color),
    borderColor: normalizeColor(input.border_color),
    textColor: normalizeColor(input.text_color),
    titleColor: normalizeColor(input.title_color),
  });

  // Parse font
  const fontKey = input.font;
  const fontConfig = getFont(fontKey);

  // Parse emoji set and border radius
  const emojiSet = input.emoji_set ?? "twitter";
  const borderRadius = input.border_radius ?? 6;

  // Fetch languages data
  const languages = await fetchLanguages(
    input.username,
    deps.token,
    input.exclude_repo ?? [],
    input.hide ?? [],
    input.langs_count
  );

  // Calculate height based on layout
  const height = input.layout === "compact" ? 165 : 195;

  // Render SVG
  const svg = await renderToSvg(
    <LanguagesCard
      borderRadius={borderRadius}
      fontFamily={fontConfig.family}
      hideBorder={input.hide_border ?? false}
      hideTitle={input.hide_title ?? false}
      languages={languages}
      layout={input.layout}
      theme={theme}
    />,
    {
      bucket: deps.bucket,
      emojiSet,
      font: fontKey,
      height,
      scheduleBackgroundTask: deps.waitUntil,
      width: 300,
    }
  );

  return svg;
}
