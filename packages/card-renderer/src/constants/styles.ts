import type { CSSProperties } from "react";
import type { Theme } from "../types";

// Spacing values
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

// Card dimensions and styling
export const CARD = {
  padding: "20px",
  borderRadius: "6px",
} as const;

// Icon and color dot sizes
export const SIZES = {
  icon: 16,
  colorDot: 12,
  progressBar: 8,
} as const;

// Font sizes
export const FONT_SIZES = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "28px",
} as const;

/**
 * Get base card container styles
 */
export function getCardContainerStyle(
  theme: Theme,
  hideBorder = false,
  fontFamily = "sans-serif"
): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: CARD.padding,
    backgroundColor: theme.bgColor,
    border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
    borderRadius: CARD.borderRadius,
    fontFamily,
  };
}

/**
 * Get color dot style for language indicators
 */
export function getColorDotStyle(color: string): CSSProperties {
  return {
    width: `${SIZES.colorDot}px`,
    height: `${SIZES.colorDot}px`,
    borderRadius: "50%",
    backgroundColor: color,
  };
}
