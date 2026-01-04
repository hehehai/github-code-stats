// Re-export types from card-renderer package
export type {
  GistCardOptions,
  GistData,
  LanguageStats,
  LanguagesCardOptions,
  RepoCardOptions,
  RepoData,
  StatsCardOptions,
  Theme,
  UserRank,
  UserStats,
} from "@github-code-stats/card-renderer";

// Cloudflare Worker environment (API-specific)
export interface Env {
  GITHUB_TOKEN: string;
  CACHE_BUCKET: R2Bucket;
}
