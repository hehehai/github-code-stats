// Cards

export { GistCard } from "./cards/gist-card";
export { LanguagesCard } from "./cards/languages-card";
export { RepoCard } from "./cards/repo-card";
export { StatsCard } from "./cards/stats-card";

// Icons
export type {
  IconComponent,
  IconName,
  IconProps,
  IconSet,
  IconSetKey,
} from "./components/icons";
export {
  DefaultIcons,
  getIcon,
  HeroIcons,
  HugeIcons,
  LucideIcons,
  PhosphorIcons,
  PixelArtIcons,
  SolarIcons,
  TablerIcons,
} from "./components/icons";
// Emoji Sets
export type { EmojiSetKey } from "./constants/emojis";
export { EMOJI_SETS, getAvailableEmojiSets } from "./constants/emojis";
// Fonts
export type { FontConfig, FontKey } from "./constants/fonts";
export { DEFAULT_FONT, FONTS, getFont } from "./constants/fonts";
// Icon Sets Config (for UI)
export { getAvailableIconSets, ICON_SETS } from "./constants/icons";

// Styles
export {
  CARD,
  FONT_SIZES,
  getCardContainerStyle,
  getColorDotStyle,
  SIZES,
  SPACING,
} from "./constants/styles";

// Themes
export { getTheme, mergeTheme, normalizeColor, themes } from "./themes";

// Types
export type {
  GistCardOptions,
  GistData,
  LanguageStats,
  LanguagesCardOptions,
  RenderOptions,
  RepoCardOptions,
  RepoData,
  StatsCardOptions,
  Theme,
  UserRank,
  UserStats,
} from "./types";

// Utils
export { containsCjk } from "./utils/cjk";
export {
  clearEmojiCache,
  createEmojiLoader,
  getEmojiCacheSize,
  loadEmoji,
} from "./utils/emoji";
export { formatNumber, truncateText } from "./utils/format";
