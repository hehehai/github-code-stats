import { StatsCard } from "../cards/stats-card";
import { getFont } from "../constants/fonts";
import { fetchStats } from "../fetchers/stats";
import { publicProcedure } from "../index";
import { statsQuerySchema } from "../schemas";
import { getTheme, mergeTheme, normalizeColor } from "../themes";
import { renderToSvg } from "../utils/renderer";
import {
  cacheAndReturn,
  checkCache,
  createSvgResponseObj,
  getCacheBucket,
  getGitHubToken,
  inputToParams,
} from "./helpers";

export const stats = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1",
    outputStructure: "detailed",
  })
  .input(statsQuerySchema)
  .handler(async ({ input }) => {
    const queryParams = inputToParams(input);

    // Check cache
    if (!input.refresh) {
      const cached = await checkCache("api", queryParams);
      if (cached) {
        return createSvgResponseObj(cached);
      }
    }

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

    const statsData = await fetchStats(
      input.username,
      getGitHubToken(),
      input.include_all_commits ?? false,
      input.count_private ?? false
    );

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
      { width: 495, height: 195, font: fontKey, bucket: getCacheBucket() }
    );

    return cacheAndReturn("api", queryParams, svg);
  });
