import { z } from "zod";
import { graphqlRequest } from "../../fetchers/github";
import { publicProcedure } from "../../index";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../../utils/kv-cache";
import { getGitHubToken } from "../helpers";

const userDataSchema = z.object({
  username: z.string().min(1).describe("GitHub username"),
});

const USER_DATA_QUERY = `
query userData($username: String!) {
  user(login: $username) {
    login
    name
    avatarUrl
    bio
    location
    company
    websiteUrl
    twitterUsername
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories {
      totalCount
    }
    createdAt
  }
}
`;

interface UserDataQueryResponse {
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    location: string | null;
    company: string | null;
    websiteUrl: string | null;
    twitterUsername: string | null;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
    createdAt: string;
  } | null;
}

export const userData = publicProcedure
  .route({
    description: "Fetch basic profile information for a GitHub user",
    method: "GET",
    path: "/api/v1/user-data",
    summary: "Get user profile data",
    tags: ["User"],
  })
  .input(userDataSchema)
  .handler(async ({ input }) => {
    // Check cache first
    const cacheKey = generateCacheKey("user", { username: input.username });
    const cached =
      await getCachedData<ReturnType<typeof formatUserData>>(cacheKey);
    if (cached) return cached;

    const data = await graphqlRequest<UserDataQueryResponse>(
      USER_DATA_QUERY,
      { username: input.username },
      getGitHubToken()
    );

    if (!data.user) {
      throw new Error(`User "${input.username}" not found`);
    }

    const result = formatUserData(data.user);

    // Cache the result
    await setCachedData(cacheKey, result);

    return result;
  });

function formatUserData(user: NonNullable<UserDataQueryResponse["user"]>) {
  return {
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    company: user.company,
    createdAt: user.createdAt,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    location: user.location,
    login: user.login,
    name: user.name,
    publicRepos: user.repositories.totalCount,
    twitterUsername: user.twitterUsername,
    websiteUrl: user.websiteUrl,
  };
}
