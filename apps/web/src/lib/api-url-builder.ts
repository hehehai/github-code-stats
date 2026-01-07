import type { CardTab } from "@/components/features/stats/card-tabs";
import type { SearchParams } from "@/lib/search-schema";

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // SSR fallback - return empty string, URL will be relative
  return "";
}

export function buildApiUrl(params: {
  username: string;
  cardTab: CardTab;
  commonConfig: SearchParams;
  statsConfig: SearchParams;
  topLangsConfig: SearchParams;
  pinConfig: SearchParams;
}): string {
  const { cardTab } = params;
  const baseUrl = getBaseUrl();
  const urlParams = buildParams(params);

  let endpoint = "/api/v1";
  if (cardTab === "topLangs") endpoint = "/api/v1/top-langs";
  if (cardTab === "pin") endpoint = "/api/v1/pin";

  return `${baseUrl}${endpoint}?${urlParams.toString()}`;
}

export function buildMarkdownEmbed(url: string, alt: string): string {
  return `![${alt}](${url})`;
}

export function buildHtmlEmbed(url: string, alt: string): string {
  return `<img src="${url}" alt="${alt}" />`;
}

export function buildParams(params: {
  username: string;
  commonConfig: SearchParams;
  statsConfig: SearchParams;
  topLangsConfig: SearchParams;
  pinConfig: SearchParams;
  cardTab: CardTab;
}): URLSearchParams {
  const {
    username,
    commonConfig,
    statsConfig,
    topLangsConfig,
    pinConfig,
    cardTab,
  } = params;
  const urlParams = new URLSearchParams();

  // Username is always required
  urlParams.set("username", username);

  // Common params
  if (commonConfig.theme !== "default")
    urlParams.set("theme", commonConfig.theme);
  if (commonConfig.font !== "google-sans-flex")
    urlParams.set("font", commonConfig.font);
  if (commonConfig.title_color)
    urlParams.set("title_color", commonConfig.title_color);
  if (commonConfig.text_color)
    urlParams.set("text_color", commonConfig.text_color);
  if (commonConfig.bg_color) urlParams.set("bg_color", commonConfig.bg_color);
  if (commonConfig.border_color)
    urlParams.set("border_color", commonConfig.border_color);
  if (commonConfig.hide_border) urlParams.set("hide_border", "true");
  if (commonConfig.hide_title) urlParams.set("hide_title", "true");

  // Tab-specific params
  if (cardTab === "stats") {
    if (statsConfig.icon_color)
      urlParams.set("icon_color", statsConfig.icon_color);
    if (statsConfig.ring_color)
      urlParams.set("ring_color", statsConfig.ring_color);
    if (statsConfig.hide_rank) urlParams.set("hide_rank", "true");
    if (!statsConfig.show_icons) urlParams.set("show_icons", "false");
    if (statsConfig.hide) urlParams.set("hide", statsConfig.hide);
    if (statsConfig.include_all_commits)
      urlParams.set("include_all_commits", "true");
    if (statsConfig.count_private) urlParams.set("count_private", "true");
  }

  if (cardTab === "topLangs") {
    if (topLangsConfig.layout !== "compact")
      urlParams.set("layout", topLangsConfig.layout);
    if (topLangsConfig.langs_count !== 5)
      urlParams.set("langs_count", String(topLangsConfig.langs_count));
    if (topLangsConfig.exclude_repo)
      urlParams.set("exclude_repo", topLangsConfig.exclude_repo);
    if (topLangsConfig.hide_langs)
      urlParams.set("hide", topLangsConfig.hide_langs);
  }

  if (cardTab === "pin") {
    urlParams.set("repo", pinConfig.repo);
    if (pinConfig.show_owner) urlParams.set("show_owner", "true");
  }

  return urlParams;
}
