import { getIcon } from "../components/icons";
import type { IconSetKey } from "../constants/icons";
import { CARD, FONT_SIZES, SPACING } from "../constants/styles";
import type { Theme, UserStats } from "../types";
import { formatNumber } from "../utils/format";

interface StatsCardProps {
  borderRadius?: number;
  fontFamily?: string;
  hide?: string[];
  hideBorder?: boolean;
  hideRank?: boolean;
  hideTitle?: boolean;
  iconSet?: IconSetKey;
  lineHeight?: number;
  showIcons?: boolean;
  stats: UserStats;
  theme: Theme;
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
        height: "90px",
        position: "relative",
        width: "90px",
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
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <span
          style={{
            color: textColor,
            fontSize: FONT_SIZES.xl,
            fontWeight: "bold",
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
      iconName: "star" as const,
      key: "stars",
      label: "Total Stars Earned",
      value: stats.totalStars,
    },
    {
      iconName: "commit" as const,
      key: "commits",
      label: "Total Commits",
      value: stats.totalCommits,
    },
    {
      iconName: "pull-request" as const,
      key: "prs",
      label: "Total PRs",
      value: stats.totalPRs,
    },
    {
      iconName: "issue" as const,
      key: "issues",
      label: "Total Issues",
      value: stats.totalIssues,
    },
    {
      iconName: "contribution" as const,
      key: "contribs",
      label: "Contributed to",
      value: stats.contributedTo,
    },
  ].filter((item) => !hide.includes(item.key));

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
        borderRadius: `${borderRadius}px`,
        display: "flex",
        fontFamily,
        height: "100%",
        padding: CARD.padding,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {!hideTitle && (
          <div
            style={{
              color: theme.titleColor,
              display: "flex",
              fontSize: FONT_SIZES.lg,
              fontWeight: 600,
              marginBottom: `${SPACING.md}px`,
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
                  alignItems: "center",
                  display: "flex",
                  height: `${lineHeight}px`,
                }}
              >
                {showIcons && <IconComponent color={theme.iconColor} />}
                <span
                  style={{
                    color: theme.textColor,
                    fontSize: FONT_SIZES.sm,
                    marginLeft: showIcons ? `${SPACING.sm}px` : "0",
                  }}
                >
                  {`${item.label}:`}
                </span>
                <span
                  style={{
                    color: theme.textColor,
                    fontSize: FONT_SIZES.sm,
                    fontWeight: 700,
                    marginLeft: `${SPACING.sm}px`,
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
            alignItems: "center",
            display: "flex",
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
