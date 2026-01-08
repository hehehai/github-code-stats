import { CARD, FONT_SIZES, SIZES, SPACING } from "../constants/styles";
import type { LanguageStats, Theme } from "../types";

interface LanguagesCardProps {
  languages: LanguageStats;
  theme: Theme;
  hideTitle?: boolean;
  hideBorder?: boolean;
  layout?: "compact" | "normal" | "pie" | "donut";
  fontFamily?: string;
  borderRadius?: number;
}

function ColorDot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: `${SIZES.colorDot}px`,
        height: `${SIZES.colorDot}px`,
        borderRadius: "50%",
        backgroundColor: color,
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
          display: "flex",
          width: "100%",
          height: `${SIZES.progressBar}px`,
          borderRadius: "4px",
          overflow: "hidden",
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
              display: "flex",
              alignItems: "center",
              marginRight: `${SPACING.md}px`,
              marginBottom: `${SPACING.xs}px`,
            }}
          >
            <ColorDot color={lang.color} />
            <span
              style={{
                fontSize: FONT_SIZES.xs,
                marginLeft: `${SPACING.xs}px`,
                color: theme.textColor,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: FONT_SIZES.xs,
                marginLeft: `${SPACING.xs}px`,
                color: theme.textColor,
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
            display: "flex",
            alignItems: "center",
            marginBottom: `${SPACING.sm}px`,
          }}
        >
          <div style={{ display: "flex", marginRight: `${SPACING.sm}px` }}>
            <ColorDot color={lang.color} />
          </div>
          <span
            style={{ flex: 1, fontSize: FONT_SIZES.sm, color: theme.textColor }}
          >
            {name}
          </span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                height: `${SIZES.progressBar}px`,
                borderRadius: "4px",
                marginRight: `${SPACING.sm}px`,
                backgroundColor: lang.color,
                width: `${Math.min(100, Math.max(20, lang.percentage * 2))}px`,
              }}
            />
            <span
              style={{
                fontSize: FONT_SIZES.xs,
                width: "48px",
                color: theme.textColor,
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
      name,
      color: lang.color,
      d: `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`,
    };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
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
              display: "flex",
              alignItems: "center",
              marginBottom: `${SPACING.xs}px`,
            }}
          >
            <div style={{ display: "flex", marginRight: `${SPACING.sm}px` }}>
              <ColorDot color={lang.color} />
            </div>
            <span style={{ fontSize: FONT_SIZES.xs, color: theme.textColor }}>
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
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: CARD.padding,
        backgroundColor: theme.bgColor,
        border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
        borderRadius: `${borderRadius}px`,
        fontFamily,
      }}
    >
      {!hideTitle && (
        <div
          style={{
            fontSize: FONT_SIZES.lg,
            fontWeight: 600,
            marginBottom: `${SPACING.md}px`,
            color: theme.titleColor,
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
