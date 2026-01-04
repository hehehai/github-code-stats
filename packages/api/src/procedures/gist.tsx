import { GistCard } from "../cards/gist-card";
import { getFont } from "../constants/fonts";
import { fetchGist } from "../fetchers/repo";
import { publicProcedure } from "../index";
import { gistQuerySchema } from "../schemas";
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

export const gist = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/gist",
    outputStructure: "detailed",
    summary: "Generate gist card SVG",
    description: "Generate a GitHub gist card as SVG image",
    tags: ["Cards"],
  })
  .input(gistQuerySchema)
  .handler(async ({ input }) => {
    const queryParams = inputToParams(input);

    // Check cache
    if (!input.refresh) {
      const cached = await checkCache("api-gist", queryParams);
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

    const gistData = await fetchGist(input.id, getGitHubToken());

    const svg = await renderToSvg(
      <GistCard
        fontFamily={fontConfig.family}
        gist={gistData}
        hideBorder={input.hide_border ?? false}
        theme={theme}
      />,
      { width: 400, height: 120, font: fontKey, bucket: getCacheBucket() }
    );

    return cacheAndReturn("api-gist", queryParams, svg);
  });
