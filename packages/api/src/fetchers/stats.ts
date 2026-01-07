import type { UserRank, UserStats } from "../types";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../utils/kv-cache";
import { graphqlRequest } from "./github";

const STATS_QUERY = `
query userStats($username: String!) {
  user(login: $username) {
    name
    login
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
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
        stargazers {
          totalCount
        }
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
      restrictedContributionsCount: number;
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
        stargazers: {
          totalCount: number;
        };
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
  // Check cache first
  const cacheKey = generateCacheKey("stats", { username, countPrivate });
  const cached = await getCachedData<UserStats>(cacheKey);
  if (cached) return cached;

  const data = await graphqlRequest<StatsQueryResponse>(
    STATS_QUERY,
    { username },
    token
  );

  if (!data.user) {
    throw new Error(`User "${username}" not found`);
  }

  const user = data.user;

  // Calculate total stars
  const totalStars = user.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazers.totalCount,
    0
  );

  // Calculate total commits
  let totalCommits = user.contributionsCollection.totalCommitContributions;
  if (countPrivate) {
    totalCommits += user.contributionsCollection.restrictedContributionsCount;
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
    name: user.name || user.login,
    username: user.login,
    totalStars,
    totalCommits,
    totalPRs,
    totalIssues,
    contributedTo,
    rank,
  };

  // Cache the result
  await setCachedData(cacheKey, result);

  return result;
}
