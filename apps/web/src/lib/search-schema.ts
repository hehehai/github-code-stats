import { z } from "zod";

export const fontSchema = z
  .enum([
    "google-sans-flex",
    "jetbrains-mono",
    "fira-code",
    "geist-mono",
    "maple-mono",
    "inter",
  ])
  .catch("google-sans-flex");

export const iconSetSchema = z
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
  .catch("default");

export const emojiSetSchema = z
  .enum(["twitter", "openmoji", "noto", "fluent"])
  .catch("twitter");

export const baseSearchSchema = z.object({
  tab: z.enum(["stats", "topLangs", "pin"]).catch("stats"),
  theme: z.string().catch("default"),
  font: fontSchema,
  title_color: z.string().optional(),
  text_color: z.string().optional(),
  bg_color: z.string().optional(),
  border_color: z.string().optional(),
  hide_border: z.boolean().catch(false),
  hide_title: z.boolean().catch(false),
  emoji_set: emojiSetSchema,
  border_radius: z.number().catch(6),
});

export const statsSearchSchema = baseSearchSchema.extend({
  icon_color: z.string().optional(),
  ring_color: z.string().optional(),
  hide_rank: z.boolean().catch(false),
  show_icons: z.boolean().catch(true),
  hide: z.string().catch(""),
  include_all_commits: z.boolean().catch(false),
  count_private: z.boolean().catch(false),
  layout: z.string().catch("compact"),
  langs_count: z.number().catch(5),
  exclude_repo: z.string().optional(),
  hide_langs: z.string().optional(),
  repo: z.string().catch(""),
  show_owner: z.boolean().catch(false),
  icon_set: iconSetSchema,
});

export const defaultSearchParams = {
  tab: "stats",
  theme: "default",
  font: "google-sans-flex",
  title_color: undefined,
  text_color: undefined,
  bg_color: undefined,
  border_color: undefined,
  hide_border: false,
  hide_title: false,
  icon_color: undefined,
  ring_color: undefined,
  hide_rank: false,
  show_icons: true,
  hide: "",
  include_all_commits: false,
  count_private: false,
  layout: "compact",
  langs_count: 5,
  exclude_repo: undefined,
  hide_langs: undefined,
  repo: "",
  show_owner: false,
  icon_set: "default",
  emoji_set: "twitter",
  border_radius: 6,
} as const;

export type SearchParams = z.infer<typeof statsSearchSchema>;
