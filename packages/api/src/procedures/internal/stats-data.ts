import { z } from "zod";
import { fetchStats } from "../../fetchers/stats";
import { publicProcedure } from "../../index";
import { getGitHubToken } from "../helpers";

const statsDataSchema = z.object({
  count_private: z.boolean().optional().describe("Count private contributions"),
  include_all_commits: z.boolean().optional().describe("Include all commits"),
  username: z.string().min(1).describe("GitHub username"),
});

export const statsData = publicProcedure
  .route({
    description:
      "Fetch GitHub statistics for a user including stars, commits, PRs, issues, and rank",
    method: "GET",
    path: "/api/v1/stats-data",
    summary: "Get user statistics data",
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
