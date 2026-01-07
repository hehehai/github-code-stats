import type { z } from "zod";
import { StatsCard } from "../cards/stats-card";
import { getFont } from "../constants/fonts";
import { fetchStats } from "../fetchers/stats";
import type { statsQuerySchema } from "../schemas";
import { getTheme, mergeTheme, normalizeColor } from "../themes";
import { containsCjk, renderToSvg } from "../utils/renderer";

export type StatsInput = z.infer<typeof statsQuerySchema>;

export interface StatsServiceDeps {
  bucket: R2Bucket;
  token: string;
}

export async function generateStatsCard(
  input: StatsInput,
  deps: StatsServiceDeps
): Promise<string> {
  // Parse theme
  const baseTheme = getTheme(input.theme);
  const theme = mergeTheme(baseTheme, {
    titleColor: normalizeColor(input.title_color),
    textColor: normalizeColor(input.text_color),
    iconColor: normalizeColor(input.icon_color),
    bgColor: normalizeColor(input.bg_color),
    borderColor: normalizeColor(input.border_color),
    ringColor: normalizeColor(input.ring_color),
  });

  // Parse font
  const fontKey = input.font;
  const fontConfig = getFont(fontKey);

  // Fetch stats data
  const statsData = await fetchStats(
    input.username,
    deps.token,
    input.include_all_commits ?? false,
    input.count_private ?? false
  );

  // Check if username (name) contains CJK characters
  const needsCjk = containsCjk(statsData.name);

  // Render SVG
  const svg = await renderToSvg(
    <StatsCard
      fontFamily={fontConfig.family}
      hide={input.hide ?? []}
      hideBorder={input.hide_border ?? false}
      hideRank={input.hide_rank ?? false}
      hideTitle={input.hide_title ?? false}
      lineHeight={input.line_height}
      showIcons={input.show_icons}
      stats={statsData}
      theme={theme}
    />,
    {
      width: 495,
      height: 195,
      font: fontKey,
      bucket: deps.bucket,
      needsCjk,
    }
  );

  return svg;
}
