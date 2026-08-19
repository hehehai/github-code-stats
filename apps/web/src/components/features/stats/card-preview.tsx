import type { EmojiSetKey, IconSetKey } from "@github-code-stats/card-renderer";
import {
  getFont,
  getTheme,
  LanguagesCard,
  mergeTheme,
  normalizeColor,
  RepoCard,
  StatsCard,
} from "@github-code-stats/card-renderer";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { useCardRenderer } from "@/hooks/use-card-renderer";
import type { SearchParams } from "@/lib/search-schema";
import { orpc } from "@/utils/orpc";
import {
  CardPreviewEmpty,
  CardPreviewError,
  CardPreviewLoading,
} from "./card-preview-states";

import type { CardTab } from "./card-tabs";

interface CardPreviewProps {
  cardTab: CardTab;
  commonConfig: SearchParams;
  pinConfig: SearchParams;
  statsConfig: SearchParams;
  topLangsConfig: SearchParams;
  username: string;
}

// Card dimensions for different card types
const CARD_DIMENSIONS = {
  pin: { height: 120, width: 400 },
  stats: { height: 195, width: 495 },
  topLangs: { height: 165, width: 300 }, // Default for compact layout
  topLangsNormal: { height: 195, width: 300 }, // For normal/pie/donut layout
} as const;

export function CardPreview({
  cardTab,
  commonConfig,
  pinConfig,
  statsConfig,
  topLangsConfig,
  username,
}: CardPreviewProps) {
  // Stats data query
  const statsDataQuery = useQuery(
    orpc.statsData.queryOptions({
      enabled: cardTab === "stats",
      input: {
        count_private: statsConfig.count_private,
        include_all_commits: statsConfig.include_all_commits,
        username,
      },
    })
  );

  // Languages data query
  const langsDataQuery = useQuery(
    orpc.langsData.queryOptions({
      enabled: cardTab === "topLangs",
      input: {
        exclude_repo: topLangsConfig.exclude_repo,
        hide: topLangsConfig.hide_langs,
        langs_count: String(topLangsConfig.langs_count),
        username,
      },
    })
  );

  // Repo data query
  const repoDataQuery = useQuery(
    orpc.repoData.queryOptions({
      enabled: cardTab === "pin" && !!pinConfig.repo,
      input: {
        repo: pinConfig.repo ?? "",
        username,
      },
    })
  );

  // Build theme from config
  const theme = useMemo(() => {
    const baseTheme = getTheme(commonConfig.theme);
    return mergeTheme(baseTheme, {
      bgColor: normalizeColor(commonConfig.bg_color),
      borderColor: normalizeColor(commonConfig.border_color),
      iconColor: normalizeColor(statsConfig.icon_color),
      ringColor: normalizeColor(statsConfig.ring_color),
      textColor: normalizeColor(commonConfig.text_color),
      titleColor: normalizeColor(commonConfig.title_color),
    });
  }, [commonConfig, statsConfig]);

  // Get font config
  const fontConfig = getFont(commonConfig.font);

  // Get icon set and emoji set
  const iconSet = (statsConfig.icon_set ?? "default") as IconSetKey;
  const emojiSet = (commonConfig.emoji_set ?? "twitter") as EmojiSetKey;
  const borderRadius = commonConfig.border_radius ?? 6;

  // Build card element based on active tab and data
  const cardElement = useMemo(() => {
    if (cardTab === "stats" && statsDataQuery.data?.stats) {
      const hideArray = statsConfig.hide
        ? statsConfig.hide.split(",").filter(Boolean)
        : [];
      return (
        <StatsCard
          borderRadius={borderRadius}
          fontFamily={fontConfig.family}
          hide={hideArray}
          hideBorder={commonConfig.hide_border}
          hideRank={statsConfig.hide_rank}
          hideTitle={commonConfig.hide_title}
          iconSet={iconSet}
          showIcons={statsConfig.show_icons}
          stats={statsDataQuery.data.stats}
          theme={theme}
        />
      );
    }

    if (cardTab === "topLangs" && langsDataQuery.data?.languages) {
      return (
        <LanguagesCard
          borderRadius={borderRadius}
          fontFamily={fontConfig.family}
          hideBorder={commonConfig.hide_border}
          hideTitle={commonConfig.hide_title}
          languages={langsDataQuery.data.languages}
          layout={
            topLangsConfig.layout as "compact" | "normal" | "pie" | "donut"
          }
          theme={theme}
        />
      );
    }

    if (cardTab === "pin" && repoDataQuery.data?.repo) {
      const pinIconSet = (pinConfig.icon_set ?? "default") as IconSetKey;
      return (
        <RepoCard
          borderRadius={borderRadius}
          fontFamily={fontConfig.family}
          hideBorder={commonConfig.hide_border}
          iconSet={pinIconSet}
          repo={repoDataQuery.data.repo}
          showOwner={pinConfig.show_owner}
          theme={theme}
        />
      );
    }

    return null;
  }, [
    cardTab,
    statsDataQuery.data,
    langsDataQuery.data,
    repoDataQuery.data,
    theme,
    fontConfig.family,
    commonConfig.hide_border,
    commonConfig.hide_title,
    statsConfig.hide,
    statsConfig.hide_rank,
    statsConfig.show_icons,
    topLangsConfig.layout,
    topLangsConfig.langs_count,
    pinConfig.show_owner,
    pinConfig.icon_set,
    iconSet,
    borderRadius,
    username,
  ]);

  // Get dimensions for current card type
  const dimensions = useMemo(() => {
    if (cardTab === "topLangs") {
      return topLangsConfig.layout === "compact"
        ? CARD_DIMENSIONS.topLangs
        : CARD_DIMENSIONS.topLangsNormal;
    }
    return CARD_DIMENSIONS[cardTab];
  }, [cardTab, topLangsConfig.layout]);

  // Get text content for CJK detection
  const textContent = useMemo(() => {
    if (cardTab === "stats" && statsDataQuery.data?.stats) {
      return statsDataQuery.data.stats.name;
    }
    if (cardTab === "pin" && repoDataQuery.data?.repo) {
      const repo = repoDataQuery.data.repo;
      return `${repo.name} ${repo.description ?? ""}`;
    }
    return "";
  }, [cardTab, statsDataQuery.data, repoDataQuery.data]);

  // Render SVG using browser renderer
  const {
    svg,
    isLoading: isRendering,
    error: renderError,
  } = useCardRenderer(cardElement, {
    emojiSet,
    font: commonConfig.font as
      | "google-sans-flex"
      | "jetbrains-mono"
      | "fira-code"
      | "maple-mono"
      | "inter"
      | "roboto"
      | "noto-sans"
      | "outfit"
      | "oxygen",
    height: dimensions.height,
    textContent,
    width: dimensions.width,
  });

  // Determine loading/error states based on active tab
  const isDataLoading =
    (cardTab === "stats" && statsDataQuery.isLoading) ||
    (cardTab === "topLangs" && langsDataQuery.isLoading) ||
    (cardTab === "pin" && repoDataQuery.isLoading);

  const dataError =
    (cardTab === "stats" && statsDataQuery.error) ||
    (cardTab === "topLangs" && langsDataQuery.error) ||
    (cardTab === "pin" && repoDataQuery.error);

  // Loading state (data fetching or rendering)
  if (isDataLoading || (cardElement && isRendering)) {
    return <CardPreviewLoading />;
  }

  // Error state
  if (dataError) {
    return (
      <CardPreviewError
        error={
          dataError instanceof Error ? dataError.message : "Failed to load data"
        }
      />
    );
  }

  if (renderError) {
    return <CardPreviewError error={renderError.message} />;
  }

  // Empty state for pin tab when no repo selected
  if (cardTab === "pin" && !pinConfig.repo) {
    return <CardPreviewEmpty message="Select a repository to preview" />;
  }

  // No data state
  if (!(cardElement && svg)) {
    return <CardPreviewEmpty message="No preview available" />;
  }

  // Render SVG
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div
        className="w-full [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
