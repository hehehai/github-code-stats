export interface FontConfig {
  name: string;
  r2Path: string;
  family: string;
}

export const FONTS = {
  "google-sans-flex": {
    name: "Google Sans Flex",
    r2Path: "storage/google-sans-flex_5.2.1_latin-400-normal.woff",
    family: "Google Sans Flex",
  },
  "jetbrains-mono": {
    name: "JetBrains Mono",
    r2Path: "storage/jetbrains-mono_5.2.8_latin-400-normal.woff",
    family: "JetBrains Mono",
  },
  "fira-code": {
    name: "Fira Code",
    r2Path: "storage/fira-code_5.2.7_latin-400-normal.woff",
    family: "Fira Code",
  },
  "geist-mono": {
    name: "Geist Mono",
    r2Path: "storage/geist-mono_5.2.7_latin-400-normal.woff",
    family: "Geist Mono",
  },
  "maple-mono": {
    name: "Maple Mono",
    r2Path: "storage/maple-mono_5.2.6_latin-400-normal.woff",
    family: "Maple Mono",
  },
  inter: {
    name: "Inter",
    r2Path: "storage/inter_5.2.6_latin-400-normal.woff",
    family: "Inter",
  },
} as const;

export type FontKey = keyof typeof FONTS;

export const DEFAULT_FONT: FontKey = "google-sans-flex";

export function getFont(key: string): FontConfig {
  if (key in FONTS) {
    return FONTS[key as FontKey];
  }
  return FONTS[DEFAULT_FONT];
}
