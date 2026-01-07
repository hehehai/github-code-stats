import { z } from "zod";
import { graphqlRequest } from "../fetchers/github";
import { publicProcedure } from "../index";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../utils/kv-cache";
import { getGitHubToken } from "./helpers";

const userReposSchema = z.object({
  username: z.string().min(1).describe("GitHub username"),
});

const USER_REPOS_QUERY = `
query userRepos($username: String!) {
  user(login: $username) {
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, isFork: false) {
      nodes {
        name
        description
        primaryLanguage {
          name
          color
        }
        stargazerCount
        forkCount
        isArchived
        isTemplate
      }
    }
  }
}
`;

interface UserReposQueryResponse {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        description: string | null;
        primaryLanguage: {
          name: string;
          color: string | null;
        } | null;
        stargazerCount: number;
        forkCount: number;
        isArchived: boolean;
        isTemplate: boolean;
      }>;
    };
  } | null;
}

export const userRepos = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/user-repos",
    summary: "Get user repositories",
    description: "Fetch the list of repositories owned by a GitHub user",
    tags: ["User"],
  })
  .input(userReposSchema)
  .handler(async ({ input }) => {
    // Check cache first
    const cacheKey = generateCacheKey("repos", { username: input.username });
    const cached = await getCachedData<{ repos: RepoItem[] }>(cacheKey);
    if (cached) return cached;

    const data = await graphqlRequest<UserReposQueryResponse>(
      USER_REPOS_QUERY,
      { username: input.username },
      getGitHubToken()
    );

    if (!data.user) {
      throw new Error(`User "${input.username}" not found`);
    }

    const result = {
      repos: data.user.repositories.nodes.map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.primaryLanguage?.name ?? null,
        languageColor: repo.primaryLanguage?.color ?? null,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        isArchived: repo.isArchived,
        isTemplate: repo.isTemplate,
      })),
    };

    // Cache the result
    await setCachedData(cacheKey, result);

    return result;
  });

interface RepoItem {
  name: string;
  description: string | null;
  language: string | null;
  languageColor: string | null;
  stars: number;
  forks: number;
  isArchived: boolean;
  isTemplate: boolean;
}
