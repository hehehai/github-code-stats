import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export interface UserData {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  websiteUrl: string | null;
  twitterUsername: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
}

const CACHE_TTL_SECONDS = 3600; // 1 hour

async function fetchUserFromGitHub(username: string): Promise<UserData> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "github-code-stats",
    },
    body: JSON.stringify({
      query: USER_DATA_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const result =
    (await response.json()) as GraphQLResponse<UserDataQueryResponse>;

  if (result.errors && result.errors.length > 0) {
    const firstError = result.errors[0];
    throw new Error(`GraphQL error: ${firstError?.message ?? "Unknown error"}`);
  }

  const user = result.data.user;
  if (!user) {
    throw new Error(`User "${username}" not found`);
  }

  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    location: user.location,
    company: user.company,
    websiteUrl: user.websiteUrl,
    twitterUsername: user.twitterUsername,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    publicRepos: user.repositories.totalCount,
    createdAt: user.createdAt,
  };
}

export const getUserData = createServerFn({ method: "GET" })
  .inputValidator((data: string) => z.string().min(1).parse(data))
  .handler(async ({ data: username }) => {
    const cacheKey = `user:${username.toLowerCase()}`;

    // Try to get from KV cache
    const cached = await env.USER_CACHE.get(cacheKey, "json");
    if (cached) {
      return cached as UserData;
    }

    // Fetch from GitHub API
    const userData = await fetchUserFromGitHub(username);

    // Store in KV cache with TTL
    await env.USER_CACHE.put(cacheKey, JSON.stringify(userData), {
      expirationTtl: CACHE_TTL_SECONDS,
    });

    return userData;
  });
