import { getIcon } from "../components/icons";
import type { IconSetKey } from "../constants/icons";
import { CARD, FONT_SIZES, SPACING } from "../constants/styles";
import type { GistData, Theme } from "../types";
import { formatNumber, truncateText } from "../utils/format";

interface GistCardProps {
  borderRadius?: number;
  fontFamily?: string;
  gist: GistData;
  hideBorder?: boolean;
  iconSet?: IconSetKey;
  theme: Theme;
}

export function GistCard({
  gist,
  theme,
  hideBorder = false,
  fontFamily = "sans-serif",
  iconSet = "default",
  borderRadius = CARD.borderRadius,
}: GistCardProps) {
  const description = gist.description
    ? truncateText(gist.description, 80)
    : "No description provided";

  const primaryFile = gist.files[0];

  const GistIcon = getIcon(iconSet, "gist");
  const FileIcon = getIcon(iconSet, "file");
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
        <GistIcon color={theme.iconColor} />
        <span
          style={{
            color: theme.titleColor,
            fontSize: FONT_SIZES.md,
            fontWeight: 600,
            marginLeft: `${SPACING.sm}px`,
          }}
        >
          {primaryFile?.name || gist.id}
        </span>
      </div>

      <div
        style={{
          color: theme.textColor,
          flex: 1,
          fontSize: FONT_SIZES.sm,
          marginBottom: `${SPACING.md}px`,
        }}
      >
        {description}
      </div>

      <div style={{ alignItems: "center", display: "flex", marginTop: "auto" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginRight: `${SPACING.md}px`,
          }}
        >
          <FileIcon color={theme.iconColor} />
          <span
            style={{
              color: theme.textColor,
              fontSize: FONT_SIZES.xs,
              marginLeft: `${SPACING.xs}px`,
            }}
          >
            {`${gist.files.length} file${gist.files.length === 1 ? "" : "s"}`}
          </span>
        </div>

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
            {formatNumber(gist.stargazerCount)}
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
            {formatNumber(gist.forkCount)}
          </span>
        </div>
      </div>
    </div>
  );
}
