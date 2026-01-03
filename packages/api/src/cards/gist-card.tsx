import { FileIcon, ForkIcon, GistIcon, StarIcon } from "../components/icons";
import { CARD, FONT_SIZES, SPACING } from "../constants/styles";
import type { GistData, Theme } from "../types";
import { formatNumber, truncateText } from "../utils/format";

interface GistCardProps {
  gist: GistData;
  theme: Theme;
  hideBorder?: boolean;
  fontFamily?: string;
}

export function GistCard({
  gist,
  theme,
  hideBorder = false,
  fontFamily = "sans-serif",
}: GistCardProps) {
  const description = gist.description
    ? truncateText(gist.description, 80)
    : "No description provided";

  const primaryFile = gist.files[0];

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
        <GistIcon color={theme.iconColor} />
        <span
          style={{
            marginLeft: `${SPACING.sm}px`,
            fontSize: FONT_SIZES.md,
            fontWeight: 600,
            color: theme.titleColor,
          }}
        >
          {primaryFile?.name || gist.id}
        </span>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: `${SPACING.md}px`,
          }}
        >
          <FileIcon color={theme.iconColor} />
          <span
            style={{
              marginLeft: `${SPACING.xs}px`,
              fontSize: FONT_SIZES.xs,
              color: theme.textColor,
            }}
          >
            {`${gist.files.length} file${gist.files.length !== 1 ? "s" : ""}`}
          </span>
        </div>

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
            {formatNumber(gist.stargazerCount)}
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
            {formatNumber(gist.forkCount)}
          </span>
        </div>
      </div>
    </div>
  );
}
