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
  "maple-mono",
  "inter",
  "roboto",
  "noto-sans",
  "outfit",
  "oxygen",
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
  description:
    "SVG cards are cached in Cloudflare R2 storage for optimal performance.",
  items: [
    {
      description:
        "Generated SVG cards are stored in R2 and reused until manually refreshed using the refresh parameter",
      title: "SVG Cache",
    },
    {
      description:
        "Browsers and Cloudflare edge cache SVG responses for 48 hours, with background revalidation",
      title: "HTTP Cache",
    },
    {
      description:
        "Add refresh=true to bypass the R2 cache; the refreshed response is not stored in browser or edge caches",
      title: "Force Refresh",
    },
    {
      description:
        "GitHub API data is cached for 24 hours in KV storage to reduce API calls",
      title: "Data Cache",
    },
  ],
  title: "Caching",
};

export interface ApiParameter {
  default?: string;
  description: string;
  enum?: readonly string[];
  max?: number;
  min?: number;
  name: string;
  required: boolean;
  type: string;
}

export interface ApiEndpoint {
  description: string;
  example: string;
  id: string;
  method: "GET";
  name: string;
  parameters: ApiParameter[];
  path: string;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    description:
      "Generate a GitHub stats card as SVG image showing stars, commits, PRs, issues, and rank.",
    example: "/api/v1?username=hehehai&show_icons=true",
    id: "stats",
    method: "GET",
    name: "Stats Card",
    parameters: [
      {
        description: "GitHub username",
        name: "username",
        required: true,
        type: "string",
      },
      {
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
        name: "theme",
        required: false,
        type: "string",
      },
      {
        description: "Title color (hex without #, e.g. ff0000)",
        name: "title_color",
        required: false,
        type: "string",
      },
      {
        description: "Text color (hex without #)",
        name: "text_color",
        required: false,
        type: "string",
      },
      {
        description: "Icon color (hex without #)",
        name: "icon_color",
        required: false,
        type: "string",
      },
      {
        description: "Background color (hex without #)",
        name: "bg_color",
        required: false,
        type: "string",
      },
      {
        description: "Border color (hex without #)",
        name: "border_color",
        required: false,
        type: "string",
      },
      {
        description: "Rank ring color (hex without #)",
        name: "ring_color",
        required: false,
        type: "string",
      },
      {
        default: "false",
        description: "Hide rank display",
        name: "hide_rank",
        required: false,
        type: "boolean",
      },
      {
        default: "false",
        description: "Hide card title",
        name: "hide_title",
        required: false,
        type: "boolean",
      },
      {
        default: "false",
        description: "Hide card border",
        name: "hide_border",
        required: false,
        type: "boolean",
      },
      {
        default: "true",
        description: "Show stat icons",
        name: "show_icons",
        required: false,
        type: "boolean",
      },
      {
        description: "Comma-separated stats to hide",
        enum: HIDE_STATS_OPTIONS,
        name: "hide",
        required: false,
        type: "string",
      },
      {
        default: "25",
        description: "Line height for stats (positive integer)",
        min: 1,
        name: "line_height",
        required: false,
        type: "number",
      },
      {
        default: "false",
        description: "Include all commits (not just current year)",
        name: "include_all_commits",
        required: false,
        type: "boolean",
      },
      {
        default: "false",
        description: "Count private contributions",
        name: "count_private",
        required: false,
        type: "boolean",
      },
      {
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
        name: "font",
        required: false,
        type: "string",
      },
      {
        default: "default",
        description: "Icon library to use for stats icons",
        enum: AVAILABLE_ICON_SETS,
        name: "icon_set",
        required: false,
        type: "string",
      },
      {
        default: "twitter",
        description: "Emoji style for rendering emojis in names/titles",
        enum: AVAILABLE_EMOJI_SETS,
        name: "emoji_set",
        required: false,
        type: "string",
      },
      {
        default: "6",
        description: "Card border radius in pixels",
        max: 50,
        min: 0,
        name: "border_radius",
        required: false,
        type: "number",
      },
      {
        default: "false",
        description: "Force refresh the card (bypass cache)",
        name: "refresh",
        required: false,
        type: "boolean",
      },
    ],
    path: "/api/v1",
  },
  {
    description:
      "Generate a card showing most used programming languages as SVG image.",
    example: "/api/v1/top-langs?username=hehehai&layout=compact&langs_count=8",
    id: "top-langs",
    method: "GET",
    name: "Top Languages Card",
    parameters: [
      {
        description: "GitHub username",
        name: "username",
        required: true,
        type: "string",
      },
      {
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
        name: "theme",
        required: false,
        type: "string",
      },
      {
        description: "Title color (hex without #)",
        name: "title_color",
        required: false,
        type: "string",
      },
      {
        description: "Text color (hex without #)",
        name: "text_color",
        required: false,
        type: "string",
      },
      {
        description: "Background color (hex without #)",
        name: "bg_color",
        required: false,
        type: "string",
      },
      {
        description: "Border color (hex without #)",
        name: "border_color",
        required: false,
        type: "string",
      },
      {
        default: "false",
        description: "Hide card title",
        name: "hide_title",
        required: false,
        type: "boolean",
      },
      {
        default: "false",
        description: "Hide card border",
        name: "hide_border",
        required: false,
        type: "boolean",
      },
      {
        default: "compact",
        description: "Layout style for language display",
        enum: LAYOUT_OPTIONS,
        name: "layout",
        required: false,
        type: "string",
      },
      {
        default: "5",
        description: "Number of languages to show",
        max: 20,
        min: 1,
        name: "langs_count",
        required: false,
        type: "number",
      },
      {
        description: "Comma-separated languages to hide (e.g. html,css)",
        name: "hide",
        required: false,
        type: "string",
      },
      {
        description: "Comma-separated repos to exclude from calculation",
        name: "exclude_repo",
        required: false,
        type: "string",
      },
      {
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
        name: "font",
        required: false,
        type: "string",
      },
      {
        default: "twitter",
        description: "Emoji style for rendering emojis",
        enum: AVAILABLE_EMOJI_SETS,
        name: "emoji_set",
        required: false,
        type: "string",
      },
      {
        default: "6",
        description: "Card border radius in pixels",
        max: 50,
        min: 0,
        name: "border_radius",
        required: false,
        type: "number",
      },
      {
        default: "false",
        description: "Force refresh the card (bypass cache)",
        name: "refresh",
        required: false,
        type: "boolean",
      },
    ],
    path: "/api/v1/top-langs",
  },
  {
    description: "Generate a repository pin card as SVG image.",
    example: "/api/v1/pin?username=facebook&repo=react",
    id: "pin",
    method: "GET",
    name: "Repository Pin Card",
    parameters: [
      {
        description: "GitHub username or organization",
        name: "username",
        required: true,
        type: "string",
      },
      {
        description: "Repository name",
        name: "repo",
        required: true,
        type: "string",
      },
      {
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
        name: "theme",
        required: false,
        type: "string",
      },
      {
        description: "Title color (hex without #)",
        name: "title_color",
        required: false,
        type: "string",
      },
      {
        description: "Text color (hex without #)",
        name: "text_color",
        required: false,
        type: "string",
      },
      {
        description: "Icon color (hex without #)",
        name: "icon_color",
        required: false,
        type: "string",
      },
      {
        description: "Background color (hex without #)",
        name: "bg_color",
        required: false,
        type: "string",
      },
      {
        description: "Border color (hex without #)",
        name: "border_color",
        required: false,
        type: "string",
      },
      {
        default: "false",
        description: "Hide card border",
        name: "hide_border",
        required: false,
        type: "boolean",
      },
      {
        default: "false",
        description: "Show repository owner in title",
        name: "show_owner",
        required: false,
        type: "boolean",
      },
      {
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
        name: "font",
        required: false,
        type: "string",
      },
      {
        default: "default",
        description: "Icon library to use for icons",
        enum: AVAILABLE_ICON_SETS,
        name: "icon_set",
        required: false,
        type: "string",
      },
      {
        default: "twitter",
        description: "Emoji style for rendering emojis in descriptions",
        enum: AVAILABLE_EMOJI_SETS,
        name: "emoji_set",
        required: false,
        type: "string",
      },
      {
        default: "6",
        description: "Card border radius in pixels",
        max: 50,
        min: 0,
        name: "border_radius",
        required: false,
        type: "number",
      },
      {
        default: "false",
        description: "Force refresh the card (bypass cache)",
        name: "refresh",
        required: false,
        type: "boolean",
      },
    ],
    path: "/api/v1/pin",
  },
  {
    description: "Generate a GitHub gist card as SVG image.",
    example: "/api/v1/gist?id=bbfce31e0217a3689c8d961a356cb10d",
    id: "gist",
    method: "GET",
    name: "Gist Card",
    parameters: [
      {
        description: "Gist ID (from gist URL)",
        name: "id",
        required: true,
        type: "string",
      },
      {
        default: "default",
        description: "Card theme",
        enum: AVAILABLE_THEMES,
        name: "theme",
        required: false,
        type: "string",
      },
      {
        description: "Title color (hex without #)",
        name: "title_color",
        required: false,
        type: "string",
      },
      {
        description: "Text color (hex without #)",
        name: "text_color",
        required: false,
        type: "string",
      },
      {
        description: "Icon color (hex without #)",
        name: "icon_color",
        required: false,
        type: "string",
      },
      {
        description: "Background color (hex without #)",
        name: "bg_color",
        required: false,
        type: "string",
      },
      {
        description: "Border color (hex without #)",
        name: "border_color",
        required: false,
        type: "string",
      },
      {
        default: "false",
        description: "Hide card border",
        name: "hide_border",
        required: false,
        type: "boolean",
      },
      {
        default: "google-sans-flex",
        description: "Font family for card text",
        enum: AVAILABLE_FONTS,
        name: "font",
        required: false,
        type: "string",
      },
      {
        default: "default",
        description: "Icon library to use for icons",
        enum: AVAILABLE_ICON_SETS,
        name: "icon_set",
        required: false,
        type: "string",
      },
      {
        default: "twitter",
        description: "Emoji style for rendering emojis in descriptions",
        enum: AVAILABLE_EMOJI_SETS,
        name: "emoji_set",
        required: false,
        type: "string",
      },
      {
        default: "6",
        description: "Card border radius in pixels",
        max: 50,
        min: 0,
        name: "border_radius",
        required: false,
        type: "number",
      },
      {
        default: "false",
        description: "Force refresh the card (bypass cache)",
        name: "refresh",
        required: false,
        type: "boolean",
      },
    ],
    path: "/api/v1/gist",
  },
];
