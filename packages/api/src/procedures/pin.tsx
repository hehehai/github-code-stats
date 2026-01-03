import { RepoCard } from "../cards/repo-card";
import { getFont } from "../constants/fonts";
import { fetchRepo } from "../fetchers/repo";
import { publicProcedure } from "../index";
import { pinQuerySchema } from "../schemas";
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

export const pin = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/pin",
    outputStructure: "detailed",
  })
  .input(pinQuerySchema)
  .handler(async ({ input }) => {
    const queryParams = inputToParams(input);

    // Check cache
    if (!input.refresh) {
      const cached = await checkCache("api-pin", queryParams);
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
    });

    // Parse font
    const fontKey = input.font;
    const fontConfig = getFont(fontKey);

    const repoData = await fetchRepo(
      input.username,
      input.repo,
      getGitHubToken()
    );

    const svg = await renderToSvg(
      <RepoCard
        fontFamily={fontConfig.family}
        hideBorder={input.hide_border ?? false}
        repo={repoData}
        showOwner={input.show_owner ?? false}
        theme={theme}
      />,
      { width: 400, height: 120, font: fontKey, bucket: getCacheBucket() }
    );

    return cacheAndReturn("api-pin", queryParams, svg);
  });
