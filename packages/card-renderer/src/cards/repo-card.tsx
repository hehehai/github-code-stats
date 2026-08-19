import { getIcon } from "../components/icons";
import type { IconSetKey } from "../constants/icons";
import { CARD, FONT_SIZES, SIZES, SPACING } from "../constants/styles";
import type { RepoData, Theme } from "../types";
import { formatNumber, truncateText } from "../utils/format";

interface RepoCardProps {
  borderRadius?: number;
  fontFamily?: string;
  hideBorder?: boolean;
  iconSet?: IconSetKey;
  repo: RepoData;
  showOwner?: boolean;
  theme: Theme;
}

export function RepoCard({
  repo,
  theme,
  hideBorder = false,
  showOwner = false,
  fontFamily = "sans-serif",
  iconSet = "default",
  borderRadius = CARD.borderRadius,
}: RepoCardProps) {
  const title = showOwner ? `${repo.owner}/${repo.name}` : repo.name;
  const description = repo.description
    ? truncateText(repo.description, 80)
    : "No description provided";

  const RepoIcon = getIcon(iconSet, "repo");
  const StarIcon = getIcon(iconSet, "star");
  const ForkIcon = getIcon(iconSet, "fork");

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
        borderRadius: `${borderRadius}px`,
        display: "flex",
        flexDirection: "column",
        fontFamily,
        height: "100%",
        padding: CARD.padding,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          marginBottom: `${SPACING.sm}px`,
        }}
      >
        <RepoIcon color={theme.iconColor} />
        <span
          style={{
            color: theme.titleColor,
            fontSize: FONT_SIZES.md,
            fontWeight: 600,
            marginLeft: `${SPACING.sm}px`,
          }}
        >
          {title}
        </span>
        {repo.isArchived && (
          <span
            style={{
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "4px",
              color: theme.textColor,
              fontSize: FONT_SIZES.xs,
              marginLeft: `${SPACING.sm}px`,
              padding: "2px 8px",
            }}
          >
            Archived
          </span>
        )}
        {repo.isTemplate && (
          <span
            style={{
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "4px",
              color: theme.textColor,
              fontSize: FONT_SIZES.xs,
              marginLeft: `${SPACING.sm}px`,
              padding: "2px 8px",
            }}
          >
            Template
          </span>
        )}
      </div>

      <div style={{ display: "flex", marginBottom: `${SPACING.sm}px` }}>
        <p
          style={{
            color: theme.textColor,
            fontSize: FONT_SIZES.sm,
            margin: "0px",
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ alignItems: "center", display: "flex" }}>
        {repo.primaryLanguage && (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              marginRight: `${SPACING.md}px`,
            }}
          >
            <div
              style={{
                backgroundColor: repo.primaryLanguage.color,
                borderRadius: "50%",
                height: `${SIZES.colorDot}px`,
                marginRight: `${SPACING.xs}px`,
                width: `${SIZES.colorDot}px`,
              }}
            />
            <span style={{ color: theme.textColor, fontSize: FONT_SIZES.xs }}>
              {repo.primaryLanguage.name}
            </span>
          </div>
        )}

        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginRight: `${SPACING.md}px`,
          }}
        >
          <StarIcon color={theme.iconColor} />
          <span
            style={{
              color: theme.textColor,
              fontSize: FONT_SIZES.xs,
              marginLeft: `${SPACING.xs}px`,
            }}
          >
            {formatNumber(repo.stargazerCount)}
          </span>
        </div>

        <div style={{ alignItems: "center", display: "flex" }}>
          <ForkIcon color={theme.iconColor} />
          <span
            style={{
              color: theme.textColor,
              fontSize: FONT_SIZES.xs,
              marginLeft: `${SPACING.xs}px`,
            }}
          >
            {formatNumber(repo.forkCount)}
          </span>
        </div>
      </div>
    </div>
  );
}
