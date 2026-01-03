// Theme configuration
export interface Theme {
  titleColor: string;
  textColor: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  ringColor: string;
}

// GitHub user stats
export interface UserStats {
  name: string;
  username: string;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
  rank: UserRank;
}

export interface UserRank {
  level: string;
  percentile: number;
  score: number;
}

// Language stats
export interface LanguageStats {
  [language: string]: {
    name: string;
    color: string;
    size: number;
    percentage: number;
  };
}

// Repository data
export interface RepoData {
  name: string;
  owner: string;
  description: string | null;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stargazerCount: number;
  forkCount: number;
  isArchived: boolean;
  isTemplate: boolean;
}

// Gist data
export interface GistData {
  id: string;
  description: string | null;
  files: {
    name: string;
    language: string | null;
  }[];
  stargazerCount: number;
  forkCount: number;
  createdAt: string;
}

// Card options
export interface StatsCardOptions {
  username: string;
  theme?: string;
  titleColor?: string;
  textColor?: string;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  hideBorder?: boolean;
  hideRank?: boolean;
  hideTitle?: boolean;
  showIcons?: boolean;
  hide?: string[];
  lineHeight?: number;
  includeAllCommits?: boolean;
  countPrivate?: boolean;
}

export interface LanguagesCardOptions {
  username: string;
  theme?: string;
  titleColor?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  hideBorder?: boolean;
  hideTitle?: boolean;
  layout?: "compact" | "normal" | "pie" | "donut";
  langsCount?: number;
  hide?: string[];
  excludeRepo?: string[];
}

export interface RepoCardOptions {
  username: string;
  repo: string;
  theme?: string;
  titleColor?: string;
  textColor?: string;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  hideBorder?: boolean;
  showOwner?: boolean;
}

export interface GistCardOptions {
  gistId: string;
  theme?: string;
  titleColor?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  hideBorder?: boolean;
}

// Cloudflare Worker environment
export interface Env {
  GITHUB_TOKEN: string;
  CACHE_BUCKET: R2Bucket;
}
