import { getIcon } from "../components/icons";
import type { IconSetKey } from "../constants/icons";
import { CARD, FONT_SIZES, SPACING } from "../constants/styles";
import type { Theme, UserStats } from "../types";
import { formatNumber } from "../utils/format";

interface StatsCardProps {
  stats: UserStats;
  theme: Theme;
  hideRank?: boolean;
  hideTitle?: boolean;
  showIcons?: boolean;
  hideBorder?: boolean;
  hide?: string[];
  lineHeight?: number;
  fontFamily?: string;
  iconSet?: IconSetKey;
  borderRadius?: number;
}

function RankCircle({
  rank,
  ringColor,
  textColor,
}: {
  rank: { level: string; percentile: number };
  ringColor: string;
  textColor: string;
}) {
  const progress = Math.min(100, Math.max(0, 100 - rank.percentile));
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "90px",
        height: "90px",
      }}
    >
      <svg
        aria-label="rank"
        height="90"
        role="img"
        viewBox="0 0 100 100"
        width="90"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="40"
          stroke={ringColor}
          strokeOpacity="0.3"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="40"
          stroke={ringColor}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          strokeWidth="6"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: FONT_SIZES.xl,
            fontWeight: "bold",
            color: textColor,
          }}
        >
          {rank.level}
        </span>
      </div>
    </div>
  );
}

export function StatsCard({
  stats,
  theme,
  hideRank = false,
  hideTitle = false,
  showIcons = true,
  hideBorder = false,
  hide = [],
  lineHeight = 25,
  fontFamily = "sans-serif",
  iconSet = "default",
  borderRadius = CARD.borderRadius,
}: StatsCardProps) {
  const items = [
    {
      key: "stars",
      iconName: "star" as const,
      label: "Total Stars Earned",
      value: stats.totalStars,
    },
    {
      key: "commits",
      iconName: "commit" as const,
      label: "Total Commits",
      value: stats.totalCommits,
    },
    {
      key: "prs",
      iconName: "pull-request" as const,
      label: "Total PRs",
      value: stats.totalPRs,
    },
    {
      key: "issues",
      iconName: "issue" as const,
      label: "Total Issues",
      value: stats.totalIssues,
    },
    {
      key: "contribs",
      iconName: "contribution" as const,
      label: "Contributed to",
      value: stats.contributedTo,
    },
  ].filter((item) => !hide.includes(item.key));

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: CARD.padding,
        backgroundColor: theme.bgColor,
        border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
        borderRadius: `${borderRadius}px`,
        fontFamily,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {!hideTitle && (
          <div
            style={{
              display: "flex",
              fontSize: FONT_SIZES.lg,
              fontWeight: 600,
              marginBottom: `${SPACING.md}px`,
              color: theme.titleColor,
            }}
          >
            {`${stats.name}'s GitHub Stats`}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item) => {
            const IconComponent = getIcon(iconSet, item.iconName);
            return (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: `${lineHeight}px`,
                }}
              >
                {showIcons && <IconComponent color={theme.iconColor} />}
                <span
                  style={{
                    marginLeft: showIcons ? `${SPACING.sm}px` : "0",
                    fontSize: FONT_SIZES.sm,
                    color: theme.textColor,
                  }}
                >
                  {`${item.label}:`}
                </span>
                <span
                  style={{
                    marginLeft: `${SPACING.sm}px`,
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 700,
                    color: theme.textColor,
                  }}
                >
                  {formatNumber(item.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {!hideRank && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: `${SPACING.md}px`,
          }}
        >
          <RankCircle
            rank={stats.rank}
            ringColor={theme.ringColor}
            textColor={theme.textColor}
          />
        </div>
      )}
    </div>
  );
}
