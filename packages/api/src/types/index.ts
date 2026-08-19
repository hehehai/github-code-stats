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
  CACHE_BUCKET: R2Bucket;
  GITHUB_TOKEN: string;
}
