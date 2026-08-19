import { z } from "zod";

// Common schemas
const booleanString = z
  .enum(["true", "false"])
  .optional()
  .transform((v) => v === "true");

const colorString = z.string().optional();

const commaList = z
  .string()
  .optional()
  .transform((v) => v?.split(",").filter(Boolean) ?? []);

// Icon set enum
const iconSetSchema = z
  .enum([
    "default",
    "hugeicons",
    "lucide",
    "heroicons",
    "solar",
    "tabler",
    "phosphor",
    "pixelarticons",
  ])
  .optional()
  .default("default");

// Emoji set enum
const emojiSetSchema = z
  .enum(["twitter", "openmoji", "noto", "fluent"])
  .optional()
  .default("twitter");

// Border radius schema
const borderRadiusSchema = z.coerce
  .number()
  .int()
  .min(0)
  .max(50)
  .optional()
  .default(6);

// Base theme schema (shared across all endpoints)
const baseThemeSchema = z.object({
  bg_color: colorString,
  border_color: colorString,
  border_radius: borderRadiusSchema,
  emoji_set: emojiSetSchema,
  text_color: colorString,
  theme: z.string().optional().default("default"),
  title_color: colorString,
});

// Font keys enum
const fontKeySchema = z
  .enum([
    "google-sans-flex",
    "jetbrains-mono",
    "fira-code",
    "maple-mono",
    "inter",
    "roboto",
    "noto-sans",
    "outfit",
    "oxygen",
  ])
  .optional()
  .default("google-sans-flex");

// Stats endpoint schema: /api
export const statsQuerySchema = baseThemeSchema.extend({
  count_private: booleanString,
  font: fontKeySchema,
  hide: commaList,
  hide_border: booleanString,
  hide_rank: booleanString,
  hide_title: booleanString,
  icon_color: colorString,
  icon_set: iconSetSchema,
  include_all_commits: booleanString,
  line_height: z.coerce.number().int().positive().optional().default(25),
  refresh: booleanString,
  ring_color: colorString,
  show_icons: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v !== "false"),
  username: z.string().min(1, "Missing username parameter"),
});

// Top languages endpoint schema: /api/top-langs
export const topLangsQuerySchema = baseThemeSchema.extend({
  exclude_repo: commaList,
  font: fontKeySchema,
  hide: commaList,
  hide_border: booleanString,
  hide_title: booleanString,
  langs_count: z.coerce.number().int().min(1).max(20).optional().default(5),
  layout: z
    .enum(["compact", "normal", "pie", "donut"])
    .optional()
    .default("compact"),
  refresh: booleanString,
  username: z.string().min(1, "Missing username parameter"),
});

// Pin endpoint schema: /api/pin
export const pinQuerySchema = baseThemeSchema.extend({
  font: fontKeySchema,
  hide_border: booleanString,
  icon_color: colorString,
  icon_set: iconSetSchema,
  refresh: booleanString,
  repo: z.string().min(1, "Missing repo parameter"),
  show_owner: booleanString,
  username: z.string().min(1, "Missing username parameter"),
});

// Gist endpoint schema: /api/gist
export const gistQuerySchema = baseThemeSchema.extend({
  font: fontKeySchema,
  hide_border: booleanString,
  icon_color: colorString,
  icon_set: iconSetSchema,
  id: z.string().min(1, "Missing id parameter"),
  refresh: booleanString,
});

// Type exports
export type StatsQuery = z.infer<typeof statsQuerySchema>;
export type TopLangsQuery = z.infer<typeof topLangsQuerySchema>;
export type PinQuery = z.infer<typeof pinQuerySchema>;
export type GistQuery = z.infer<typeof gistQuerySchema>;
