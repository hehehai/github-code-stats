import { LanguagesCard } from "../cards/languages-card";
import { getFont } from "../constants/fonts";
import { fetchLanguages } from "../fetchers/languages";
import { publicProcedure } from "../index";
import { topLangsQuerySchema } from "../schemas";
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

export const topLangs = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/top-langs",
    outputStructure: "detailed",
  })
  .input(topLangsQuerySchema)
  .handler(async ({ input }) => {
    const queryParams = inputToParams(input);

    // Check cache
    if (!input.refresh) {
      const cached = await checkCache("api-top-langs", queryParams);
      if (cached) {
        return createSvgResponseObj(cached);
      }
    }

    // Parse theme
    const baseTheme = getTheme(input.theme);
    const theme = mergeTheme(baseTheme, {
      titleColor: normalizeColor(input.title_color),
      textColor: normalizeColor(input.text_color),
      bgColor: normalizeColor(input.bg_color),
      borderColor: normalizeColor(input.border_color),
    });

    // Parse font
    const fontKey = input.font;
    const fontConfig = getFont(fontKey);

    const languages = await fetchLanguages(
      input.username,
      getGitHubToken(),
      input.exclude_repo ?? [],
      input.hide ?? [],
      input.langs_count
    );

    const height = input.layout === "compact" ? 165 : 195;

    const svg = await renderToSvg(
      <LanguagesCard
        fontFamily={fontConfig.family}
        hideBorder={input.hide_border ?? false}
        hideTitle={input.hide_title ?? false}
        languages={languages}
        layout={input.layout}
        theme={theme}
      />,
      { width: 300, height, font: fontKey, bucket: getCacheBucket() }
    );

    return cacheAndReturn("api-top-langs", queryParams, svg);
  });
