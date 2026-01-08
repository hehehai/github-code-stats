// Available themes
export const AVAILABLE_THEMES = [
  "default",
  "dark",
  "radical",
  "tokyonight",
  "dracula",
  "nord",
  "gruvbox",
  "onedark",
  "cobalt",
  "synthwave",
  "highcontrast",
  "github_dark",
  "github_light",
  "catppuccin_mocha",
  "catppuccin_latte",
] as const;

// Available fonts
export const AVAILABLE_FONTS = [
  "google-sans-flex",
  "jetbrains-mono",
  "fira-code",
  "geist-mono",
  "maple-mono",
  "inter",
] as const;

// Available icon sets
export const AVAILABLE_ICON_SETS = [
  "default",
  "hugeicons",
  "lucide",
  "heroicons",
  "solar",
  "tabler",
  "phosphor",
  "pixelarticons",
] as const;

// Available emoji sets
export const AVAILABLE_EMOJI_SETS = [
  "twitter",
  "openmoji",
  "noto",
  "fluent",
] as const;

// Layout options for top languages
export const LAYOUT_OPTIONS = ["compact", "normal", "pie", "donut"] as const;

// Stats that can be hidden
export const HIDE_STATS_OPTIONS = [
  "stars",
  "commits",
  "prs",
  "issues",
  "contribs",
] as const;

// Cache information
export const cacheInfo = {
  title: "Caching",
  description:
    "SVG cards are cached in Cloudflare R2 storage for optimal performance.",
  items: [
    {
      title: "SVG Cache",
      description:
        "Generated SVG cards are cached until manually refreshed using the refresh parameter",
    },
    {
      title: "Force Refresh",
      description:
        "Add refresh=true parameter to force regenerate the card with fresh data",
    },
    {
      title: "Data Cache",
      description:
        "GitHub API data is cached for 24 hours in KV storage to reduce API calls",
    },
  ],
};

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  enum?: readonly string[];
  min?: number;
  max?: number;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: "GET";
  path: string;
  description: string;
  parameters: ApiParameter[];
  example: string;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: "stats",
    name: "Stats Card",
    method: "GET",
    path: "/api/v1",
    description:
      "Generate a GitHub stats card as SVG image showing stars, commits, PRs, issues, and rank.",
    parameters: [
      {
        name: "username",
        type: "string",
        required: true,
        description: "GitHub username",
      },
      {
        name: "theme",
        type: "string",
        required: false,
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
      },
      {
        name: "title_color",
        type: "string",
        required: false,
        description: "Title color (hex without #, e.g. ff0000)",
      },
      {
        name: "text_color",
        type: "string",
        required: false,
        description: "Text color (hex without #)",
      },
      {
        name: "icon_color",
        type: "string",
        required: false,
        description: "Icon color (hex without #)",
      },
      {
        name: "bg_color",
        type: "string",
        required: false,
        description: "Background color (hex without #)",
      },
      {
        name: "border_color",
        type: "string",
        required: false,
        description: "Border color (hex without #)",
      },
      {
        name: "ring_color",
        type: "string",
        required: false,
        description: "Rank ring color (hex without #)",
      },
      {
        name: "hide_rank",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide rank display",
      },
      {
        name: "hide_title",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card title",
      },
      {
        name: "hide_border",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card border",
      },
      {
        name: "show_icons",
        type: "boolean",
        required: false,
        default: "true",
        description: "Show stat icons",
      },
      {
        name: "hide",
        type: "string",
        required: false,
        description: "Comma-separated stats to hide",
        enum: HIDE_STATS_OPTIONS,
      },
      {
        name: "line_height",
        type: "number",
        required: false,
        default: "25",
        description: "Line height for stats (positive integer)",
        min: 1,
      },
      {
        name: "include_all_commits",
        type: "boolean",
        required: false,
        default: "false",
        description: "Include all commits (not just current year)",
      },
      {
        name: "count_private",
        type: "boolean",
        required: false,
        default: "false",
        description: "Count private contributions",
      },
      {
        name: "font",
        type: "string",
        required: false,
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
      },
      {
        name: "icon_set",
        type: "string",
        required: false,
        default: "default",
        description: "Icon library to use for stats icons",
        enum: AVAILABLE_ICON_SETS,
      },
      {
        name: "emoji_set",
        type: "string",
        required: false,
        default: "twitter",
        description: "Emoji style for rendering emojis in names/titles",
        enum: AVAILABLE_EMOJI_SETS,
      },
      {
        name: "border_radius",
        type: "number",
        required: false,
        default: "6",
        description: "Card border radius in pixels",
        min: 0,
        max: 50,
      },
      {
        name: "refresh",
        type: "boolean",
        required: false,
        default: "false",
        description: "Force refresh the card (bypass cache)",
      },
    ],
    example: "/api/v1?username=hehehai&show_icons=true",
  },
  {
    id: "top-langs",
    name: "Top Languages Card",
    method: "GET",
    path: "/api/v1/top-langs",
    description:
      "Generate a card showing most used programming languages as SVG image.",
    parameters: [
      {
        name: "username",
        type: "string",
        required: true,
        description: "GitHub username",
      },
      {
        name: "theme",
        type: "string",
        required: false,
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
      },
      {
        name: "title_color",
        type: "string",
        required: false,
        description: "Title color (hex without #)",
      },
      {
        name: "text_color",
        type: "string",
        required: false,
        description: "Text color (hex without #)",
      },
      {
        name: "bg_color",
        type: "string",
        required: false,
        description: "Background color (hex without #)",
      },
      {
        name: "border_color",
        type: "string",
        required: false,
        description: "Border color (hex without #)",
      },
      {
        name: "hide_title",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card title",
      },
      {
        name: "hide_border",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card border",
      },
      {
        name: "layout",
        type: "string",
        required: false,
        default: "compact",
        description: "Layout style for language display",
        enum: LAYOUT_OPTIONS,
      },
      {
        name: "langs_count",
        type: "number",
        required: false,
        default: "5",
        description: "Number of languages to show",
        min: 1,
        max: 20,
      },
      {
        name: "hide",
        type: "string",
        required: false,
        description: "Comma-separated languages to hide (e.g. html,css)",
      },
      {
        name: "exclude_repo",
        type: "string",
        required: false,
        description: "Comma-separated repos to exclude from calculation",
      },
      {
        name: "font",
        type: "string",
        required: false,
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
      },
      {
        name: "emoji_set",
        type: "string",
        required: false,
        default: "twitter",
        description: "Emoji style for rendering emojis",
        enum: AVAILABLE_EMOJI_SETS,
      },
      {
        name: "border_radius",
        type: "number",
        required: false,
        default: "6",
        description: "Card border radius in pixels",
        min: 0,
        max: 50,
      },
      {
        name: "refresh",
        type: "boolean",
        required: false,
        default: "false",
        description: "Force refresh the card (bypass cache)",
      },
    ],
    example: "/api/v1/top-langs?username=hehehai&layout=compact&langs_count=8",
  },
  {
    id: "pin",
    name: "Repository Pin Card",
    method: "GET",
    path: "/api/v1/pin",
    description: "Generate a repository pin card as SVG image.",
    parameters: [
      {
        name: "username",
        type: "string",
        required: true,
        description: "GitHub username or organization",
      },
      {
        name: "repo",
        type: "string",
        required: true,
        description: "Repository name",
      },
      {
        name: "theme",
        type: "string",
        required: false,
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
      },
      {
        name: "title_color",
        type: "string",
        required: false,
        description: "Title color (hex without #)",
      },
      {
        name: "text_color",
        type: "string",
        required: false,
        description: "Text color (hex without #)",
      },
      {
        name: "icon_color",
        type: "string",
        required: false,
        description: "Icon color (hex without #)",
      },
      {
        name: "bg_color",
        type: "string",
        required: false,
        description: "Background color (hex without #)",
      },
      {
        name: "border_color",
        type: "string",
        required: false,
        description: "Border color (hex without #)",
      },
      {
        name: "hide_border",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card border",
      },
      {
        name: "show_owner",
        type: "boolean",
        required: false,
        default: "false",
        description: "Show repository owner in title",
      },
      {
        name: "font",
        type: "string",
        required: false,
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
      },
      {
        name: "icon_set",
        type: "string",
        required: false,
        default: "default",
        description: "Icon library to use for icons",
        enum: AVAILABLE_ICON_SETS,
      },
      {
        name: "emoji_set",
        type: "string",
        required: false,
        default: "twitter",
        description: "Emoji style for rendering emojis in descriptions",
        enum: AVAILABLE_EMOJI_SETS,
      },
      {
        name: "border_radius",
        type: "number",
        required: false,
        default: "6",
        description: "Card border radius in pixels",
        min: 0,
        max: 50,
      },
      {
        name: "refresh",
        type: "boolean",
        required: false,
        default: "false",
        description: "Force refresh the card (bypass cache)",
      },
    ],
    example: "/api/v1/pin?username=facebook&repo=react",
  },
  {
    id: "gist",
    name: "Gist Card",
    method: "GET",
    path: "/api/v1/gist",
    description: "Generate a GitHub gist card as SVG image.",
    parameters: [
      {
        name: "id",
        type: "string",
        required: true,
        description: "Gist ID (from gist URL)",
      },
      {
        name: "theme",
        type: "string",
        required: false,
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
      },
      {
        name: "title_color",
        type: "string",
        required: false,
        description: "Title color (hex without #)",
      },
      {
        name: "text_color",
        type: "string",
        required: false,
        description: "Text color (hex without #)",
      },
      {
        name: "icon_color",
        type: "string",
        required: false,
        description: "Icon color (hex without #)",
      },
      {
        name: "bg_color",
        type: "string",
        required: false,
        description: "Background color (hex without #)",
      },
      {
        name: "border_color",
        type: "string",
        required: false,
        description: "Border color (hex without #)",
      },
      {
        name: "hide_border",
        type: "boolean",
        required: false,
        default: "false",
        description: "Hide card border",
      },
      {
        name: "font",
        type: "string",
        required: false,
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
      },
      {
        name: "icon_set",
        type: "string",
        required: false,
        default: "default",
        description: "Icon library to use for icons",
        enum: AVAILABLE_ICON_SETS,
      },
      {
        name: "emoji_set",
        type: "string",
        required: false,
        default: "twitter",
        description: "Emoji style for rendering emojis in descriptions",
        enum: AVAILABLE_EMOJI_SETS,
      },
      {
        name: "border_radius",
        type: "number",
        required: false,
        default: "6",
        description: "Card border radius in pixels",
        min: 0,
        max: 50,
      },
      {
        name: "refresh",
        type: "boolean",
        required: false,
        default: "false",
        description: "Force refresh the card (bypass cache)",
      },
    ],
    example: "/api/v1/gist?id=bbfce31e0217a3689c8d961a356cb10d",
  },
];
