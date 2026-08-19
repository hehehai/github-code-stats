import type { CSSProperties } from "react";
import type { Theme } from "../types";

// Spacing values
export const SPACING = {
  lg: 20,
  md: 16,
  sm: 8,
  xl: 24,
  xs: 4,
} as const;

// Card dimensions and styling
export const CARD = {
  borderRadius: 6, // Default border radius in pixels
  padding: "20px",
} as const;

// Icon and color dot sizes
export const SIZES = {
  colorDot: 12,
  icon: 16,
  progressBar: 8,
} as const;

// Font sizes
export const FONT_SIZES = {
  lg: "18px",
  md: "16px",
  sm: "14px",
  xl: "28px",
  xs: "12px",
} as const;

/**
 * Get base card container styles
 */
export function getCardContainerStyle(
  theme: Theme,
  hideBorder = false,
  fontFamily = "sans-serif",
  borderRadius: number = CARD.borderRadius
): CSSProperties {
  return {
    backgroundColor: theme.bgColor,
    border: hideBorder ? "none" : `1px solid ${theme.borderColor}`,
    borderRadius: `${borderRadius}px`,
    display: "flex",
    flexDirection: "column",
    fontFamily,
    height: "100%",
    padding: CARD.padding,
    width: "100%",
  };
}

/**
 * Get color dot style for language indicators
 */
export function getColorDotStyle(color: string): CSSProperties {
  return {
    backgroundColor: color,
    borderRadius: "50%",
    height: `${SIZES.colorDot}px`,
    width: `${SIZES.colorDot}px`,
  };
}
