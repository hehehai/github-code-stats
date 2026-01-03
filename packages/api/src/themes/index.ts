import type { Theme } from "../types";

export const themes: Record<string, Theme> = {
  default: {
    titleColor: "#2f80ed",
    textColor: "#434d58",
    iconColor: "#4c71f2",
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
    ringColor: "#2f80ed",
  },
  dark: {
    titleColor: "#fff",
    textColor: "#9f9f9f",
    iconColor: "#79ff97",
    bgColor: "#151515",
    borderColor: "#e4e2e2",
    ringColor: "#79ff97",
  },
  radical: {
    titleColor: "#fe428e",
    textColor: "#a9fef7",
    iconColor: "#f8d847",
    bgColor: "#141321",
    borderColor: "#e4e2e2",
    ringColor: "#fe428e",
  },
  tokyonight: {
    titleColor: "#70a5fd",
    textColor: "#38bdae",
    iconColor: "#bf91f3",
    bgColor: "#1a1b27",
    borderColor: "#e4e2e2",
    ringColor: "#70a5fd",
  },
  dracula: {
    titleColor: "#ff79c6",
    textColor: "#f8f8f2",
    iconColor: "#bd93f9",
    bgColor: "#282a36",
    borderColor: "#e4e2e2",
    ringColor: "#ff79c6",
  },
  nord: {
    titleColor: "#81a1c1",
    textColor: "#d8dee9",
    iconColor: "#88c0d0",
    bgColor: "#2e3440",
    borderColor: "#e4e2e2",
    ringColor: "#81a1c1",
  },
  gruvbox: {
    titleColor: "#fabd2f",
    textColor: "#ebdbb2",
    iconColor: "#fe8019",
    bgColor: "#282828",
    borderColor: "#e4e2e2",
    ringColor: "#fabd2f",
  },
  onedark: {
    titleColor: "#e4bf7a",
    textColor: "#abb2bf",
    iconColor: "#8eb573",
    bgColor: "#282c34",
    borderColor: "#e4e2e2",
    ringColor: "#e4bf7a",
  },
  cobalt: {
    titleColor: "#e683d9",
    textColor: "#75eeb2",
    iconColor: "#0480ef",
    bgColor: "#193549",
    borderColor: "#e4e2e2",
    ringColor: "#e683d9",
  },
  synthwave: {
    titleColor: "#e2e9ec",
    textColor: "#e5289e",
    iconColor: "#ef8539",
    bgColor: "#2b213a",
    borderColor: "#e4e2e2",
    ringColor: "#e2e9ec",
  },
  highcontrast: {
    titleColor: "#e7f216",
    textColor: "#fff",
    iconColor: "#00ffff",
    bgColor: "#000",
    borderColor: "#e4e2e2",
    ringColor: "#e7f216",
  },
  github_dark: {
    titleColor: "#58a6ff",
    textColor: "#c9d1d9",
    iconColor: "#58a6ff",
    bgColor: "#0d1117",
    borderColor: "#30363d",
    ringColor: "#58a6ff",
  },
  github_light: {
    titleColor: "#0969da",
    textColor: "#1f2328",
    iconColor: "#0969da",
    bgColor: "#ffffff",
    borderColor: "#d0d7de",
    ringColor: "#0969da",
  },
  catppuccin_mocha: {
    titleColor: "#cba6f7",
    textColor: "#cdd6f4",
    iconColor: "#f5c2e7",
    bgColor: "#1e1e2e",
    borderColor: "#313244",
    ringColor: "#cba6f7",
  },
  catppuccin_latte: {
    titleColor: "#8839ef",
    textColor: "#4c4f69",
    iconColor: "#ea76cb",
    bgColor: "#eff1f5",
    borderColor: "#dce0e8",
    ringColor: "#8839ef",
  },
};

export function getTheme(themeName = "default"): Theme {
  // Default theme is always defined
  const defaultTheme: Theme = {
    titleColor: "#2f80ed",
    textColor: "#434d58",
    iconColor: "#4c71f2",
    bgColor: "#fffefe",
    borderColor: "#e4e2e2",
    ringColor: "#2f80ed",
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
