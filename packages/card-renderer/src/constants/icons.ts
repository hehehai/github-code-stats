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
  description: string;
  name: string;
}

export const ICON_SETS: Record<IconSetKey, IconSetConfig> = {
  default: { description: "GitHub-style icons", name: "Default" },
  heroicons: { description: "Beautiful outline icons", name: "HeroIcons" },
  hugeicons: { description: "Clean stroke icons", name: "HugeIcons" },
  lucide: { description: "Simple stroke icons", name: "Lucide" },
  phosphor: { description: "Flexible icon family", name: "Phosphor" },
  pixelarticons: {
    description: "Retro pixel art style",
    name: "PixelartIcons",
  },
  solar: { description: "Modern filled icons", name: "Solar" },
  tabler: { description: "Stroke-based icons", name: "Tabler" },
} as const;

/**
 * Get available icon sets as array for UI
 */
export function getAvailableIconSets(): Array<{
  value: IconSetKey;
  label: string;
}> {
  return Object.entries(ICON_SETS).map(([key, config]) => ({
    label: config.name,
    value: key as IconSetKey,
  }));
}
