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

interface RawRepositoryLanguages {
  languages: Array<{
    color: string;
    name: string;
    size: number;
  }>;
  name: string;
}

const rawRepositoriesInflight = new Map<
  string,
  Promise<RawRepositoryLanguages[]>
>();

async function loadRawRepositories(
  username: string,
  token: string
): Promise<RawRepositoryLanguages[]> {
  const rawCacheKey = generateCacheKey("langs-raw", { username });
  const cached = await getCachedData<RawRepositoryLanguages[]>(rawCacheKey);
  if (cached) return cached;

  const inflight = rawRepositoriesInflight.get(rawCacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    const repositories: RawRepositoryLanguages[] = [];
    let hasNextPage = true;
    let cursor: string | null = null;

    // Fetch all repositories (handles pagination) once per user per TTL.
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
        repositories.push({
          languages: repo.languages.edges.map((edge) => ({
            color:
              edge.node.color || languageColors[edge.node.name] || "#858585",
            name: edge.node.name,
            size: edge.size,
          })),
          name: repo.name,
        });
      }

      hasNextPage = response.user.repositories.pageInfo.hasNextPage;
      cursor = response.user.repositories.pageInfo.endCursor;
    }

    await setCachedData(rawCacheKey, repositories);
    return repositories;
  })().finally(() => {
    rawRepositoriesInflight.delete(rawCacheKey);
  });

  rawRepositoriesInflight.set(rawCacheKey, promise);
  return promise;
}

export async function fetchLanguages(
  username: string,
  token: string,
  excludeRepos: string[] = [],
  hide: string[] = [],
  langsCount = 5
): Promise<LanguageStats> {
  const rawRepositories = await loadRawRepositories(username, token);

  const languageMap = new Map<string, { color: string; size: number }>();
  for (const repo of rawRepositories) {
    if (excludeRepos.includes(repo.name)) continue;

    for (const language of repo.languages) {
      if (hide.includes(language.name.toLowerCase())) continue;

      const existing = languageMap.get(language.name);
      languageMap.set(language.name, {
        color: language.color,
        size: (existing?.size ?? 0) + language.size,
      });
    }
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

  return result;
}
