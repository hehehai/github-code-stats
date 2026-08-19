import type { EmojiSetKey } from "../constants/emojis";
import type { IconSetKey } from "../constants/icons";

// Re-export for convenience
export type { EmojiSetKey } from "../constants/emojis";
export type { IconSetKey } from "../constants/icons";

// Theme configuration
export interface Theme {
  bgColor: string;
  borderColor: string;
  iconColor: string;
  ringColor: string;
  textColor: string;
  titleColor: string;
}

// GitHub user stats
export interface UserStats {
  contributedTo: number;
  name: string;
  rank: UserRank;
  totalCommits: number;
  totalIssues: number;
  totalPRs: number;
  totalStars: number;
  username: string;
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
  description: string | null;
  forkCount: number;
  isArchived: boolean;
  isTemplate: boolean;
  name: string;
  owner: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stargazerCount: number;
}

// Gist data
export interface GistData {
  createdAt: string;
  description: string | null;
  files: {
    name: string;
    language: string | null;
  }[];
  forkCount: number;
  id: string;
  stargazerCount: number;
}

// Card options
export interface StatsCardOptions {
  bgColor?: string;
  borderColor?: string;
  borderRadius?: number;
  countPrivate?: boolean;
  hide?: string[];
  hideBorder?: boolean;
  hideRank?: boolean;
  hideTitle?: boolean;
  iconColor?: string;
  iconSet?: IconSetKey;
  includeAllCommits?: boolean;
  lineHeight?: number;
  showIcons?: boolean;
  textColor?: string;
  theme?: string;
  titleColor?: string;
  username: string;
}

export interface LanguagesCardOptions {
  bgColor?: string;
  borderColor?: string;
  borderRadius?: number;
  excludeRepo?: string[];
  hide?: string[];
  hideBorder?: boolean;
  hideTitle?: boolean;
  langsCount?: number;
  layout?: "compact" | "normal" | "pie" | "donut";
  textColor?: string;
  theme?: string;
  titleColor?: string;
  username: string;
}

export interface RepoCardOptions {
  bgColor?: string;
  borderColor?: string;
  borderRadius?: number;
  hideBorder?: boolean;
  iconColor?: string;
  iconSet?: IconSetKey;
  repo: string;
  showOwner?: boolean;
  textColor?: string;
  theme?: string;
  titleColor?: string;
  username: string;
}

export interface GistCardOptions {
  bgColor?: string;
  borderColor?: string;
  borderRadius?: number;
  gistId: string;
  hideBorder?: boolean;
  iconSet?: IconSetKey;
  textColor?: string;
  theme?: string;
  titleColor?: string;
}

// Render options
export interface RenderOptions {
  emojiSet?: EmojiSetKey;
  font?: string;
  height: number;
  width: number;
}
