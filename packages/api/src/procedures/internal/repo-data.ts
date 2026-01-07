import { z } from "zod";
import { fetchRepo } from "../../fetchers/repo";
import { publicProcedure } from "../../index";
import { getGitHubToken } from "../helpers";

const repoDataSchema = z.object({
  username: z.string().min(1).describe("GitHub username or organization"),
  repo: z.string().min(1).describe("Repository name"),
});

export const repoData = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/repo-data",
    summary: "Get repository data",
    description: "Fetch details about a specific GitHub repository",
    tags: ["Repository"],
  })
  .input(repoDataSchema)
  .handler(async ({ input }) => {
    const repo = await fetchRepo(input.username, input.repo, getGitHubToken());

    return { repo };
  });
