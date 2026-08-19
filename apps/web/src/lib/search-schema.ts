import { z } from "zod";

export const fontSchema = z
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
  bg_color: z.string().optional(),
  border_color: z.string().optional(),
  border_radius: z.number().catch(6),
  emoji_set: emojiSetSchema,
  font: fontSchema,
  hide_border: z.boolean().catch(false),
  hide_title: z.boolean().catch(false),
  tab: z.enum(["stats", "topLangs", "pin"]).catch("stats"),
  text_color: z.string().optional(),
  theme: z.string().catch("default"),
  title_color: z.string().optional(),
});

export const statsSearchSchema = baseSearchSchema.extend({
  count_private: z.boolean().catch(false),
  exclude_repo: z.string().optional(),
  hide: z.string().catch(""),
  hide_langs: z.string().optional(),
  hide_rank: z.boolean().catch(false),
  icon_color: z.string().optional(),
  icon_set: iconSetSchema,
  include_all_commits: z.boolean().catch(false),
  langs_count: z.number().catch(5),
  layout: z.string().catch("compact"),
  repo: z.string().catch(""),
  ring_color: z.string().optional(),
  show_icons: z.boolean().catch(true),
  show_owner: z.boolean().catch(false),
});

export const defaultSearchParams = {
  bg_color: undefined,
  border_color: undefined,
  border_radius: 6,
  count_private: false,
  emoji_set: "twitter",
  exclude_repo: undefined,
  font: "google-sans-flex",
  hide: "",
  hide_border: false,
  hide_langs: undefined,
  hide_rank: false,
  hide_title: false,
  icon_color: undefined,
  icon_set: "default",
  include_all_commits: false,
  langs_count: 5,
  layout: "compact",
  repo: "",
  ring_color: undefined,
  show_icons: true,
  show_owner: false,
  tab: "stats",
  text_color: undefined,
  theme: "default",
  title_color: undefined,
} as const;

export type SearchParams = z.infer<typeof statsSearchSchema>;
