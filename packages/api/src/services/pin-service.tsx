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
    titleColor: normalizeColor(input.title_color),
    textColor: normalizeColor(input.text_color),
    iconColor: normalizeColor(input.icon_color),
    bgColor: normalizeColor(input.bg_color),
    borderColor: normalizeColor(input.border_color),
  });

  // Parse font
  const fontKey = input.font;
  const fontConfig = getFont(fontKey);

  // Fetch repo data
  const repoData = await fetchRepo(input.username, input.repo, deps.token);

  // Check if repo name or description contains CJK characters
  const needsCjk =
    containsCjk(repoData.name) || containsCjk(repoData.description ?? "");

  // Render SVG
  const svg = await renderToSvg(
    <RepoCard
      fontFamily={fontConfig.family}
      hideBorder={input.hide_border ?? false}
      repo={repoData}
      showOwner={input.show_owner ?? false}
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
