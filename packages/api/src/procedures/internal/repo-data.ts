import { z } from "zod";
import { fetchRepo } from "../../fetchers/repo";
import { publicProcedure } from "../../index";
import { getGitHubToken } from "../helpers";

const repoDataSchema = z.object({
  repo: z.string().min(1).describe("Repository name"),
  username: z.string().min(1).describe("GitHub username or organization"),
});

export const repoData = publicProcedure
  .route({
    description: "Fetch details about a specific GitHub repository",
    method: "GET",
    path: "/api/v1/repo-data",
    summary: "Get repository data",
    tags: ["Repository"],
  })
  .input(repoDataSchema)
  .handler(async ({ input }) => {
    const repo = await fetchRepo(input.username, input.repo, getGitHubToken());

    return { repo };
  });
