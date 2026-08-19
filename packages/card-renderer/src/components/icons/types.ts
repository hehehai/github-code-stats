import type { ReactElement } from "react";

export type IconSetKey =
  | "default"
  | "lucide"
  | "tabler"
  | "phosphor"
  | "heroicons"
  | "solar"
  | "hugeicons"
  | "pixelarticons";

export type IconName =
  | "star"
  | "fork"
  | "commit"
  | "pull-request"
  | "issue"
  | "contribution"
  | "repo"
  | "gist"
  | "file";

export interface IconProps {
  color: string;
  size?: number;
}

export type IconComponent = (props: IconProps) => ReactElement;

export type IconSet = Record<IconName, IconComponent>;

export interface IconSetConfig {
  icons: IconSet;
  name: string;
}
