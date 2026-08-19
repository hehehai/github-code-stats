import { z } from "zod";
import { graphqlRequest } from "../../fetchers/github";
import { publicProcedure } from "../../index";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../../utils/kv-cache";
import { getGitHubToken } from "../helpers";

const validateUserSchema = z.object({
  username: z.string().min(1).describe("GitHub username to validate"),
});

const USER_QUERY = `
query userInfo($username: String!) {
  user(login: $username) {
    login
    name
    avatarUrl
  }
}
`;

interface UserQueryResponse {
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
  } | null;
}

export interface ValidateUserResult {
  error?: string;
  user?: {
    login: string;
    name: string | null;
    avatarUrl: string;
  };
  valid: boolean;
}

export const validateUser = publicProcedure
  .route({
    description: "Check if a GitHub username exists and get basic info",
    method: "GET",
    path: "/api/v1/validate-user",
    summary: "Validate GitHub user",
    tags: ["User"],
  })
  .input(validateUserSchema)
  .handler(async ({ input }) => {
    const cacheKey = generateCacheKey("validate", { username: input.username });

    const cached = await getCachedData<ValidateUserResult>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const data = await graphqlRequest<UserQueryResponse>(
        USER_QUERY,
        { username: input.username },
        getGitHubToken()
      );

      if (!data.user) {
        const result: ValidateUserResult = {
          error: `User "${input.username}" not found`,
          valid: false,
        };
        await setCachedData(cacheKey, result);
        return result;
      }

      const result: ValidateUserResult = {
        user: {
          avatarUrl: data.user.avatarUrl,
          login: data.user.login,
          name: data.user.name,
        },
        valid: true,
      };
      await setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        valid: false,
      };
    }
  });
