import { z } from "zod";
import { graphqlRequest } from "../fetchers/github";
import { publicProcedure } from "../index";
import { getGitHubToken } from "./helpers";

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
    method: "GET",
    path: "/api/v1/user-data",
    summary: "Get user profile data",
    description: "Fetch basic profile information for a GitHub user",
    tags: ["User"],
  })
  .input(userDataSchema)
  .handler(async ({ input }) => {
    const data = await graphqlRequest<UserDataQueryResponse>(
      USER_DATA_QUERY,
      { username: input.username },
      getGitHubToken()
    );

    if (!data.user) {
      throw new Error(`User "${input.username}" not found`);
    }

    return {
      login: data.user.login,
      name: data.user.name,
      avatarUrl: data.user.avatarUrl,
      bio: data.user.bio,
      location: data.user.location,
      company: data.user.company,
      websiteUrl: data.user.websiteUrl,
      twitterUsername: data.user.twitterUsername,
      followers: data.user.followers.totalCount,
      following: data.user.following.totalCount,
      publicRepos: data.user.repositories.totalCount,
      createdAt: data.user.createdAt,
    };
  });
