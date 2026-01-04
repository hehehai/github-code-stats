import { z } from "zod";
import { graphqlRequest } from "../fetchers/github";
import { publicProcedure } from "../index";
import { getGitHubToken } from "./helpers";

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

export const validateUser = publicProcedure
  .route({
    method: "GET",
    path: "/api/v1/validate-user",
    summary: "Validate GitHub user",
    description: "Check if a GitHub username exists and get basic info",
    tags: ["User"],
  })
  .input(validateUserSchema)
  .handler(async ({ input }) => {
    try {
      const data = await graphqlRequest<UserQueryResponse>(
        USER_QUERY,
        { username: input.username },
        getGitHubToken()
      );

      if (!data.user) {
        return {
          valid: false,
          error: `User "${input.username}" not found`,
        };
      }

      return {
        valid: true,
        user: {
          login: data.user.login,
          name: data.user.name,
          avatarUrl: data.user.avatarUrl,
        },
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
