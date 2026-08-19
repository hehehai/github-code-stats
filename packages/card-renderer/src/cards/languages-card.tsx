import { CARD, FONT_SIZES, SIZES, SPACING } from "../constants/styles";
import type { LanguageStats, Theme } from "../types";

interface LanguagesCardProps {
  borderRadius?: number;
  fontFamily?: string;
  hideBorder?: boolean;
  hideTitle?: boolean;
  languages: LanguageStats;
  layout?: "compact" | "normal" | "pie" | "donut";
  theme: Theme;
}

function ColorDot({ color }: { color: string }) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        height: `${SIZES.colorDot}px`,
        width: `${SIZES.colorDot}px`,
      }}
    />
  );
}

function LanguageBar({
  languages,
  theme,
}: {
  languages: LanguageStats;
  theme: Theme;
}) {
  const entries = Object.entries(languages);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          borderRadius: "4px",
          display: "flex",
          height: `${SIZES.progressBar}px`,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {entries.map(([name, lang]) => (
          <div
            key={name}
            style={{
              backgroundColor: lang.color,
              width: `${lang.percentage}%`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: `${SIZES.colorDot}px`,
        }}
      >
        {entries.map(([name, lang]) => (
          <div
            key={name}
            style={{
              alignItems: "center",
              display: "flex",
              marginBottom: `${SPACING.xs}px`,
              marginRight: `${SPACING.md}px`,
            }}
          >
            <ColorDot color={lang.color} />
            <span
              style={{
                color: theme.textColor,
                fontSize: FONT_SIZES.xs,
                marginLeft: `${SPACING.xs}px`,
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: theme.textColor,
                fontSize: FONT_SIZES.xs,
                marginLeft: `${SPACING.xs}px`,
                opacity: 0.7,
              }}
            >
              {`${lang.percentage.toFixed(1)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageList({
  languages,
  theme,
}: {
  languages: LanguageStats;
  theme: Theme;
}) {
  const entries = Object.entries(languages);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {entries.map(([name, lang]) => (
        <div
          key={name}
          style={{
            alignItems: "center",
            display: "flex",
            marginBottom: `${SPACING.sm}px`,
          }}
        >
          <div style={{ display: "flex", marginRight: `${SPACING.sm}px` }}>
            <ColorDot color={lang.color} />
          </div>
          <span
            style={{ color: theme.textColor, flex: 1, fontSize: FONT_SIZES.sm }}
          >
            {name}
          </span>
          <div style={{ alignItems: "center", display: "flex" }}>
            <div
              style={{
                backgroundColor: lang.color,
                borderRadius: "4px",
                height: `${SIZES.progressBar}px`,
                marginRight: `${SPACING.sm}px`,
                width: `${Math.min(100, Math.max(20, lang.percentage * 2))}px`,
              }}
            />
            <span
              style={{
                color: theme.textColor,
                fontSize: FONT_SIZES.xs,
                width: "48px",
              }}
            >
              {`${lang.percentage.toFixed(1)}%`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function LanguageDonut({
  languages,
  theme,
}: {
  languages: LanguageStats;
  theme: Theme;
}) {
  const entries = Object.entries(languages);
  const size = 100;
  const radius = 40;
  const innerRadius = 25;

  let currentAngle = 0;
  const paths = entries.map(([name, lang]) => {
    const angle = (lang.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = 50 + radius * Math.cos(startRad);
    const y1 = 50 + radius * Math.sin(startRad);
    const x2 = 50 + radius * Math.cos(endRad);
    const y2 = 50 + radius * Math.sin(endRad);

    const ix1 = 50 + innerRadius * Math.cos(startRad);
    const iy1 = 50 + innerRadius * Math.sin(startRad);
    const ix2 = 50 + innerRadius * Math.cos(endRad);
    const iy2 = 50 + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      color: lang.color,
      d: `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`,
      name,
    };
  });

  return (
    <div style={{ alignItems: "center", display: "flex", width: "100%" }}>
      <svg
        aria-label="languages chart"
        height="100"
        role="img"
        viewBox={`0 0 ${size} ${size}`}
        width="100"
      >
        {paths.map((p) => (
          <path d={p.d} fill={p.color} key={p.name} />
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: `${SPACING.xl}px`,
        }}
      >
        {entries.map(([name, lang]) => (
          <div
            key={name}
            style={{
              alignItems: "center",
              display: "flex",
              marginBottom: `${SPACING.xs}px`,
            }}
          >
            <div style={{ display: "flex", marginRight: `${SPACING.sm}px` }}>
              <ColorDot color={lang.color} />
            </div>
            <span style={{ color: theme.textColor, fontSize: FONT_SIZES.xs }}>
              {`${name} (${lang.percentage.toFixed(1)}%)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LanguagesCard({
  languages,
  theme,
  hideTitle = false,
  hideBorder = false,
  layout = "compact",
  fontFamily = "sans-serif",
  borderRadius = CARD.borderRadius,
}: LanguagesCardProps) {
  const isEmpty = Object.keys(languages).length === 0;

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
      {!hideTitle && (
        <div
          style={{
            color: theme.titleColor,
            fontSize: FONT_SIZES.lg,
            fontWeight: 600,
            marginBottom: `${SPACING.md}px`,
          }}
        >
          Most Used Languages
        </div>
      )}
      {isEmpty ? (
        <span style={{ color: theme.textColor }}>No languages found</span>
      ) : layout === "compact" ? (
        <LanguageBar languages={languages} theme={theme} />
      ) : layout === "donut" || layout === "pie" ? (
        <LanguageDonut languages={languages} theme={theme} />
      ) : (
        <LanguageList languages={languages} theme={theme} />
      )}
    </div>
  );
}
