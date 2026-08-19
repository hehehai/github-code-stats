import { z } from "zod";
import { fetchLanguages } from "../../fetchers/languages";
import { publicProcedure } from "../../index";
import { getGitHubToken } from "../helpers";

const langsDataSchema = z.object({
  exclude_repo: z
    .string()
    .optional()
    .describe("Comma-separated list of repositories to exclude")
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : []
    ),
  hide: z
    .string()
    .optional()
    .describe("Comma-separated list of languages to hide")
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        : []
    ),
  langs_count: z
    .string()
    .optional()
    .describe("Number of languages to show (1-20)")
    .transform((val) => {
      if (!val) return 5;
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? 5 : Math.min(20, Math.max(1, num));
    }),
  username: z.string().min(1).describe("GitHub username"),
});

export const langsData = publicProcedure
  .route({
    description: "Fetch the most used programming languages for a GitHub user",
    method: "GET",
    path: "/api/v1/langs-data",
    summary: "Get user language statistics",
    tags: ["Languages"],
  })
  .input(langsDataSchema)
  .handler(async ({ input }) => {
    const languages = await fetchLanguages(
      input.username,
      getGitHubToken(),
      input.exclude_repo,
      input.hide,
      input.langs_count
    );

    return { languages };
  });
