import { ForkIcon, RepoIcon, StarIcon } from "../components/icons";
import { CARD, FONT_SIZES, SIZES, SPACING } from "../constants/styles";
import type { RepoData, Theme } from "../types";
import { formatNumber, truncateText } from "../utils/format";

interface RepoCardProps {
  repo: RepoData;
  theme: Theme;
  hideBorder?: boolean;
  showOwner?: boolean;
  fontFamily?: string;
}

export function RepoCard({
  repo,
  theme,
  hideBorder = false,
  showOwner = false,
  fontFamily = "sans-serif",
}: RepoCardProps) {
  const title = showOwner ? `${repo.owner}/${repo.name}` : repo.name;
  const description = repo.description
    ? truncateText(repo.description, 80)
    : "No description provided";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: CARD.padding,
        backgroundColor: theme.bgColor,
        border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
        borderRadius: CARD.borderRadius,
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: `${SPACING.sm}px`,
        }}
      >
        <RepoIcon color={theme.iconColor} />
        <span
          style={{
            marginLeft: `${SPACING.sm}px`,
            fontSize: FONT_SIZES.md,
            fontWeight: 600,
            color: theme.titleColor,
          }}
        >
          {title}
        </span>
        {repo.isArchived && (
          <span
            style={{
              marginLeft: `${SPACING.sm}px`,
              padding: "2px 8px",
              fontSize: FONT_SIZES.xs,
              borderRadius: "4px",
              color: theme.textColor,
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            Archived
          </span>
        )}
        {repo.isTemplate && (
          <span
            style={{
              marginLeft: `${SPACING.sm}px`,
              padding: "2px 8px",
              fontSize: FONT_SIZES.xs,
              borderRadius: "4px",
              color: theme.textColor,
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            Template
          </span>
        )}
      </div>

      <div
        style={{
          fontSize: FONT_SIZES.sm,
          marginBottom: `${SPACING.md}px`,
          flex: 1,
          color: theme.textColor,
        }}
      >
        {description}
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
        {repo.primaryLanguage && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: `${SPACING.md}px`,
            }}
          >
            <div
              style={{
                width: `${SIZES.colorDot}px`,
                height: `${SIZES.colorDot}px`,
                borderRadius: "50%",
                marginRight: `${SPACING.xs}px`,
                backgroundColor: repo.primaryLanguage.color,
              }}
            />
            <span style={{ fontSize: FONT_SIZES.xs, color: theme.textColor }}>
              {repo.primaryLanguage.name}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: `${SPACING.md}px`,
          }}
        >
          <StarIcon color={theme.iconColor} />
          <span
            style={{
              marginLeft: `${SPACING.xs}px`,
              fontSize: FONT_SIZES.xs,
              color: theme.textColor,
            }}
          >
            {formatNumber(repo.stargazerCount)}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <ForkIcon color={theme.iconColor} />
          <span
            style={{
              marginLeft: `${SPACING.xs}px`,
              fontSize: FONT_SIZES.xs,
              color: theme.textColor,
            }}
          >
            {formatNumber(repo.forkCount)}
          </span>
        </div>
      </div>
    </div>
  );
}
