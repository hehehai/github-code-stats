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

// Base theme schema (shared across all endpoints)
const baseThemeSchema = z.object({
  theme: z.string().optional().default("default"),
  title_color: colorString,
  text_color: colorString,
  bg_color: colorString,
  border_color: colorString,
});

// Font keys enum
const fontKeySchema = z
  .enum([
    "google-sans-flex",
    "jetbrains-mono",
    "fira-code",
    "geist-mono",
    "maple-mono",
    "inter",
  ])
  .optional()
  .default("google-sans-flex");

// Stats endpoint schema: /api
export const statsQuerySchema = baseThemeSchema.extend({
  username: z.string().min(1, "Missing username parameter"),
  icon_color: colorString,
  ring_color: colorString,
  hide_rank: booleanString,
  hide_title: booleanString,
  show_icons: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v !== "false"),
  hide_border: booleanString,
  hide: commaList,
  line_height: z.coerce.number().int().positive().optional().default(25),
  include_all_commits: booleanString,
  count_private: booleanString,
  font: fontKeySchema,
  refresh: booleanString,
});

// Top languages endpoint schema: /api/top-langs
export const topLangsQuerySchema = baseThemeSchema.extend({
  username: z.string().min(1, "Missing username parameter"),
  hide_title: booleanString,
  hide_border: booleanString,
  layout: z
    .enum(["compact", "normal", "pie", "donut"])
    .optional()
    .default("compact"),
  langs_count: z.coerce.number().int().min(1).max(20).optional().default(5),
  hide: commaList,
  exclude_repo: commaList,
  font: fontKeySchema,
  refresh: booleanString,
});

// Pin endpoint schema: /api/pin
export const pinQuerySchema = baseThemeSchema.extend({
  username: z.string().min(1, "Missing username parameter"),
  repo: z.string().min(1, "Missing repo parameter"),
  icon_color: colorString,
  hide_border: booleanString,
  show_owner: booleanString,
  font: fontKeySchema,
  refresh: booleanString,
});

// Gist endpoint schema: /api/gist
export const gistQuerySchema = baseThemeSchema.extend({
  id: z.string().min(1, "Missing id parameter"),
  icon_color: colorString,
  hide_border: booleanString,
  font: fontKeySchema,
  refresh: booleanString,
});

// Type exports
export type StatsQuery = z.infer<typeof statsQuerySchema>;
export type TopLangsQuery = z.infer<typeof topLangsQuerySchema>;
export type PinQuery = z.infer<typeof pinQuerySchema>;
export type GistQuery = z.infer<typeof gistQuerySchema>;
