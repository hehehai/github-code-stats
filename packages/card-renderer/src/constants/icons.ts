// Icon set definitions - all icons are now inline SVG components
// No external CDN dependencies

export type IconSetKey =
  | "default"
  | "lucide"
  | "tabler"
  | "phosphor"
  | "heroicons"
  | "solar"
  | "hugeicons"
  | "pixelarticons";

export type IconName =
  | "star"
  | "fork"
  | "commit"
  | "pull-request"
  | "issue"
  | "contribution"
  | "repo"
  | "gist"
  | "file";

export interface IconSetConfig {
  name: string;
  description: string;
}

export const ICON_SETS: Record<IconSetKey, IconSetConfig> = {
  default: { name: "Default", description: "GitHub-style icons" },
  lucide: { name: "Lucide", description: "Simple stroke icons" },
  tabler: { name: "Tabler", description: "Stroke-based icons" },
  phosphor: { name: "Phosphor", description: "Flexible icon family" },
  heroicons: { name: "HeroIcons", description: "Beautiful outline icons" },
  solar: { name: "Solar", description: "Modern filled icons" },
  hugeicons: { name: "HugeIcons", description: "Clean stroke icons" },
  pixelarticons: {
    name: "PixelartIcons",
    description: "Retro pixel art style",
  },
} as const;

/**
 * Get available icon sets as array for UI
 */
export function getAvailableIconSets(): Array<{
  value: IconSetKey;
  label: string;
}> {
  return Object.entries(ICON_SETS).map(([key, config]) => ({
    value: key as IconSetKey,
    label: config.name,
  }));
}
