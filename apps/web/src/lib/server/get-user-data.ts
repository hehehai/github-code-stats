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
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  createdAt: string;
  followers: number;
  following: number;
  location: string | null;
  login: string;
  name: string | null;
  publicRepos: number;
  twitterUsername: string | null;
  websiteUrl: string | null;
}

const CACHE_TTL_SECONDS = 3600; // 1 hour

async function fetchUserFromGitHub(username: string): Promise<UserData> {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: USER_DATA_QUERY,
      variables: { username },
    }),
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "github-code-stats",
    },
    method: "POST",
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

export const getUserData = createServerFn({ method: "GET" })
  .validator((data: string) => z.string().min(1).parse(data))
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
