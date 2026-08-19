import type { Theme } from "../types";

export const themes: Record<string, Theme> = {
  catppuccin_latte: {
    bgColor: "#eff1f5",
    borderColor: "#dce0e8",
    iconColor: "#ea76cb",
    ringColor: "#8839ef",
    textColor: "#4c4f69",
    titleColor: "#8839ef",
  },
  catppuccin_mocha: {
    bgColor: "#1e1e2e",
    borderColor: "#313244",
    iconColor: "#f5c2e7",
    ringColor: "#cba6f7",
    textColor: "#cdd6f4",
    titleColor: "#cba6f7",
  },
  cobalt: {
    bgColor: "#193549",
    borderColor: "#e4e2e2",
    iconColor: "#0480ef",
    ringColor: "#e683d9",
    textColor: "#75eeb2",
    titleColor: "#e683d9",
  },
  dark: {
    bgColor: "#151515",
    borderColor: "#e4e2e2",
    iconColor: "#79ff97",
    ringColor: "#79ff97",
    textColor: "#9f9f9f",
    titleColor: "#fff",
  },
  default: {
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
    iconColor: "#4c71f2",
    ringColor: "#2f80ed",
    textColor: "#434d58",
    titleColor: "#2f80ed",
  },
  dracula: {
    bgColor: "#282a36",
    borderColor: "#e4e2e2",
    iconColor: "#bd93f9",
    ringColor: "#ff79c6",
    textColor: "#f8f8f2",
    titleColor: "#ff79c6",
  },
  github_dark: {
    bgColor: "#0d1117",
    borderColor: "#30363d",
    iconColor: "#58a6ff",
    ringColor: "#58a6ff",
    textColor: "#c9d1d9",
    titleColor: "#58a6ff",
  },
  github_light: {
    bgColor: "#ffffff",
    borderColor: "#d0d7de",
    iconColor: "#0969da",
    ringColor: "#0969da",
    textColor: "#1f2328",
    titleColor: "#0969da",
  },
  gruvbox: {
    bgColor: "#282828",
    borderColor: "#e4e2e2",
    iconColor: "#fe8019",
    ringColor: "#fabd2f",
    textColor: "#ebdbb2",
    titleColor: "#fabd2f",
  },
  highcontrast: {
    bgColor: "#000",
    borderColor: "#e4e2e2",
    iconColor: "#00ffff",
    ringColor: "#e7f216",
    textColor: "#fff",
    titleColor: "#e7f216",
  },
  nord: {
    bgColor: "#2e3440",
    borderColor: "#e4e2e2",
    iconColor: "#88c0d0",
    ringColor: "#81a1c1",
    textColor: "#d8dee9",
    titleColor: "#81a1c1",
  },
  onedark: {
    bgColor: "#282c34",
    borderColor: "#e4e2e2",
    iconColor: "#8eb573",
    ringColor: "#e4bf7a",
    textColor: "#abb2bf",
    titleColor: "#e4bf7a",
  },
  radical: {
    bgColor: "#141321",
    borderColor: "#e4e2e2",
    iconColor: "#f8d847",
    ringColor: "#fe428e",
    textColor: "#a9fef7",
    titleColor: "#fe428e",
  },
  synthwave: {
    bgColor: "#2b213a",
    borderColor: "#e4e2e2",
    iconColor: "#ef8539",
    ringColor: "#e2e9ec",
    textColor: "#e5289e",
    titleColor: "#e2e9ec",
  },
  tokyonight: {
    bgColor: "#1a1b27",
    borderColor: "#e4e2e2",
    iconColor: "#bf91f3",
    ringColor: "#70a5fd",
    textColor: "#38bdae",
    titleColor: "#70a5fd",
  },
};

export function getTheme(themeName = "default"): Theme {
  // Default theme is always defined
  const defaultTheme: Theme = {
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
    iconColor: "#4c71f2",
    ringColor: "#2f80ed",
    textColor: "#434d58",
    titleColor: "#2f80ed",
  };
  const theme = themes[themeName];
  return theme ?? defaultTheme;
}

export function mergeTheme(
  baseTheme: Theme,
  customColors: Partial<Theme>
): Theme {
  return {
    ...baseTheme,
    ...Object.fromEntries(
      Object.entries(customColors).filter(([_, v]) => v !== undefined)
    ),
  } as Theme;
}

// Helper to normalize color (add # if missing)
export function normalizeColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  if (color.startsWith("#")) return color;
  if (/^[0-9a-fA-F]{6}$/.test(color) || /^[0-9a-fA-F]{3}$/.test(color)) {
    return `#${color}`;
  }
  return color;
}
