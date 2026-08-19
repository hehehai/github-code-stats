import type { LanguageStats } from "../types";
import {
  generateCacheKey,
  getCachedData,
  setCachedData,
} from "../utils/kv-cache";
import { languageColors } from "../utils/language-colors";
import { graphqlRequest } from "./github";

const LANGUAGES_QUERY = `
query userLanguages($username: String!, $after: String) {
  user(login: $username) {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, after: $after) {
      nodes {
        name
        languages(first: 10, orderBy: {direction: DESC, field: SIZE}) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

interface LanguagesQueryResponse {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        languages: {
          edges: Array<{
            size: number;
            node: {
              name: string;
              color: string | null;
            };
          }>;
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
}

export async function fetchLanguages(
  username: string,
  token: string,
  excludeRepos: string[] = [],
  hide: string[] = [],
  langsCount = 5
): Promise<LanguageStats> {
  // Check cache first
  const cacheKey = generateCacheKey("langs", {
    excludeRepos: excludeRepos.join(","),
    hide: hide.join(","),
    langsCount,
    username,
  });
  const cached = await getCachedData<LanguageStats>(cacheKey);
  if (cached) return cached;

  const languageMap = new Map<string, { size: number; color: string }>();

  let hasNextPage = true;
  let cursor: string | null = null;

  // Fetch all repositories (handles pagination)
  while (hasNextPage) {
    const response: LanguagesQueryResponse =
      await graphqlRequest<LanguagesQueryResponse>(
        LANGUAGES_QUERY,
        { after: cursor, username },
        token
      );

    if (!response.user) {
      throw new Error(`User "${username}" not found`);
    }

    for (const repo of response.user.repositories.nodes) {
      // Skip excluded repos
      if (excludeRepos.includes(repo.name)) continue;

      for (const edge of repo.languages.edges) {
        const langName = edge.node.name;

        // Skip hidden languages
        if (hide.includes(langName.toLowerCase())) continue;

        const existing = languageMap.get(langName);
        const color = edge.node.color || languageColors[langName] || "#858585";

        if (existing) {
          languageMap.set(langName, {
            color,
            size: existing.size + edge.size,
          });
        } else {
          languageMap.set(langName, { color, size: edge.size });
        }
      }
    }

    hasNextPage = response.user.repositories.pageInfo.hasNextPage;
    cursor = response.user.repositories.pageInfo.endCursor;
  }

  // Sort by size and take top N
  const sortedLanguages = Array.from(languageMap.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, langsCount);

  // Calculate total size for percentage
  const totalSize = sortedLanguages.reduce(
    (sum, [_, langData]) => sum + langData.size,
    0
  );

  // Build result
  const result: LanguageStats = {};
  for (const [name, data] of sortedLanguages) {
    result[name] = {
      color: data.color,
      name,
      percentage: totalSize > 0 ? (data.size / totalSize) * 100 : 0,
      size: data.size,
    };
  }

  // Cache the result
  await setCachedData(cacheKey, result);

  return result;
}
