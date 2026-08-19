import type { UserRank, UserStats } from "../types";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../utils/kv-cache";
import { graphqlRequest } from "./github";

const STATS_QUERY = `
query userStats($username: String!, $countPrivate: Boolean!) {
  user(login: $username) {
    name
    login
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount @include(if: $countPrivate)
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
    pullRequests(first: 1) {
      totalCount
    }
    openIssues: issues(states: OPEN) {
      totalCount
    }
    closedIssues: issues(states: CLOSED) {
      totalCount
    }
    followers {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
      totalCount
      nodes {
        stargazerCount
      }
    }
  }
}
`;

interface StatsQueryResponse {
  user: {
    name: string | null;
    login: string;
    contributionsCollection: {
      totalCommitContributions: number;
      restrictedContributionsCount?: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    openIssues: {
      totalCount: number;
    };
    closedIssues: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: Array<{
        stargazerCount: number;
      }>;
    };
  };
}

// Calculate rank based on github-readme-stats algorithm
function calculateRank(
  commits: number,
  prs: number,
  issues: number,
  stars: number,
  followers: number,
  contributedTo: number
): UserRank {
  const COMMITS_WEIGHT = 2;
  const PRS_WEIGHT = 3;
  const ISSUES_WEIGHT = 1;
  const STARS_WEIGHT = 4;
  const FOLLOWERS_WEIGHT = 1;
  const CONTRIBUTED_TO_WEIGHT = 1;

  const score =
    commits * COMMITS_WEIGHT +
    prs * PRS_WEIGHT +
    issues * ISSUES_WEIGHT +
    stars * STARS_WEIGHT +
    followers * FOLLOWERS_WEIGHT +
    contributedTo * CONTRIBUTED_TO_WEIGHT;

  // Calculate percentile (simplified algorithm)
  const percentile = Math.min(100, Math.max(0, 100 - score / 100));

  // Determine level
  let level: string;
  if (percentile <= 1) {
    level = "S+";
  } else if (percentile <= 5) {
    level = "S";
  } else if (percentile <= 10) {
    level = "A++";
  } else if (percentile <= 25) {
    level = "A+";
  } else if (percentile <= 50) {
    level = "A";
  } else if (percentile <= 75) {
    level = "B+";
  } else if (percentile <= 90) {
    level = "B";
  } else {
    level = "C";
  }

  return { level, percentile, score };
}

export async function fetchStats(
  username: string,
  token: string,
  _includeAllCommits = false,
  countPrivate = false
): Promise<UserStats> {
  console.info("[stats-fetcher] Fetching for:", username);

  // Check cache first
  const cacheKey = generateCacheKey("stats", { countPrivate, username });
  console.info("[stats-fetcher] KV cache key:", cacheKey);

  try {
    const cached = await getCachedData<UserStats>(cacheKey);
    if (cached) {
      console.info("[stats-fetcher] KV cache hit");
      return cached;
    }
    console.info("[stats-fetcher] KV cache miss");
  } catch (error) {
    console.error("[stats-fetcher] KV cache error:", error);
    // Continue without cache
  }

  console.info("[stats-fetcher] Calling GitHub API...");
  const data = await graphqlRequest<StatsQueryResponse>(
    STATS_QUERY,
    { countPrivate, username },
    token
  );
  console.info("[stats-fetcher] GitHub API response received");

  if (!data.user) {
    throw new Error(`User "${username}" not found`);
  }

  const user = data.user;

  // Calculate total stars
  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );

  // Calculate total commits
  let totalCommits = user.contributionsCollection.totalCommitContributions;
  if (countPrivate) {
    totalCommits +=
      user.contributionsCollection.restrictedContributionsCount ?? 0;
  }

  const totalPRs = user.pullRequests.totalCount;
  const totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount;
  const contributedTo = user.repositoriesContributedTo.totalCount;
  const followers = user.followers.totalCount;

  const rank = calculateRank(
    totalCommits,
    totalPRs,
    totalIssues,
    totalStars,
    followers,
    contributedTo
  );

  const result: UserStats = {
    contributedTo,
    name: user.name || user.login,
    rank,
    totalCommits,
    totalIssues,
    totalPRs,
    totalStars,
    username: user.login,
  };

  // Cache the result
  try {
    await setCachedData(cacheKey, result);
    console.info("[stats-fetcher] KV cache set");
  } catch (error) {
    console.error("[stats-fetcher] KV cache set error:", error);
  }

  return result;
}
