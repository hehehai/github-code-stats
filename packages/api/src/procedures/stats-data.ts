import { z } from "zod";
import { fetchStats } from "../fetchers/stats";
import { publicProcedure } from "../index";
import { getGitHubToken } from "./helpers";

const statsDataSchema = z.object({
  username: z.string().min(1).describe("GitHub username"),
  include_all_commits: z.boolean().optional().describe("Include all commits"),
  count_private: z.boolean().optional().describe("Count private contributions"),
});

export const statsData = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/stats-data",
    summary: "Get user statistics data",
    description:
      "Fetch GitHub statistics for a user including stars, commits, PRs, issues, and rank",
    tags: ["Stats"],
  })
  .input(statsDataSchema)
  .handler(async ({ input }) => {
    const stats = await fetchStats(
      input.username,
      getGitHubToken(),
      input.include_all_commits ?? false,
      input.count_private ?? false
    );

    return { stats };
  });
