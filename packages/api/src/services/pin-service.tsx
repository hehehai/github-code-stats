import type { z } from "zod";
import { RepoCard } from "../cards/repo-card";
import { getFont } from "../constants/fonts";
import { fetchRepo } from "../fetchers/repo";
import type { pinQuerySchema } from "../schemas";
import { getTheme, mergeTheme, normalizeColor } from "../themes";
import { containsCjk, renderToSvg } from "../utils/renderer";

export type PinInput = z.infer<typeof pinQuerySchema>;

export interface PinServiceDeps {
  bucket: R2Bucket;
  token: string;
}

export async function generatePinCard(
  input: PinInput,
  deps: PinServiceDeps
): Promise<string> {
  // Parse theme
  const baseTheme = getTheme(input.theme);
  const theme = mergeTheme(baseTheme, {
    bgColor: normalizeColor(input.bg_color),
    borderColor: normalizeColor(input.border_color),
    iconColor: normalizeColor(input.icon_color),
    textColor: normalizeColor(input.text_color),
    titleColor: normalizeColor(input.title_color),
  });

  // Parse font
  const fontKey = input.font;
  const fontConfig = getFont(fontKey);

  // Parse icon set, emoji set and border radius
  const iconSet = input.icon_set ?? "default";
  const emojiSet = input.emoji_set ?? "twitter";
  const borderRadius = input.border_radius ?? 6;

  // Fetch repo data
  const repoData = await fetchRepo(input.username, input.repo, deps.token);

  // Check if repo name or description contains CJK characters
  const needsCjk =
    containsCjk(repoData.name) || containsCjk(repoData.description ?? "");

  // Render SVG
  const svg = await renderToSvg(
    <RepoCard
      borderRadius={borderRadius}
      fontFamily={fontConfig.family}
      hideBorder={input.hide_border ?? false}
      iconSet={iconSet}
      repo={repoData}
      showOwner={input.show_owner ?? false}
      theme={theme}
    />,
    {
      bucket: deps.bucket,
      emojiSet,
      font: fontKey,
      height: 120,
      needsCjk,
      width: 400,
    }
  );

  return svg;
}
