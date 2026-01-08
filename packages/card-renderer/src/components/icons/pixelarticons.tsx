import type { IconProps, IconSet } from "./types";

function Star({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="star"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 2L9 9H2l6 5-3 8 7-5 7 5-3-8 6-5h-7z" />
    </svg>
  );
}

function Fork({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="fork"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M11 2h2v6h-2zM11 16h2v6h-2zM7 6h2v2H7zM15 6h2v2h-2zM5 4h2v2H5zM17 4h2v2h-2zM5 8h2v2H5zM17 8h2v2h-2zM7 10h10v2H7zM11 12h2v4h-2z" />
    </svg>
  );
}

function Commit({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="commit"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M11 2h2v6h-2zM11 16h2v6h-2zM8 8h8v8H8z" />
    </svg>
  );
}

function PullRequest({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="pull-request"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M4 2h4v4H4zM4 18h4v4H4zM16 18h4v4h-4zM6 6h2v12H6zM18 12h2v6h-2zM12 4h6v2h-6zM10 6h2v2h-2zM12 8h2v2h-2zM14 10h4v2h-4z" />
    </svg>
  );
}

function Issue({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="issue"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M9 2h6v2h2v2h2v2h2v6h-2v2h-2v2h-2v2H9v-2H7v-2H5v-2H3V8h2V6h2V4h2zM11 7h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

function Contribution({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="contribution"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M2 11h2v2H2zM4 13h2v2H4zM6 11h2v2H6zM8 9h2v2H8zM10 7h2v2h-2zM12 5h2v2h-2zM14 7h2v2h-2zM16 9h2v2h-2zM18 11h2v2h-2zM20 13h2v2h-2z" />
    </svg>
  );
}

function Repo({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="repo"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M4 2h14v20H4v-2h12v-2H4v-2h12V4H6v10h4V8h2v8H4z" />
    </svg>
  );
}

function Gist({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="gist"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M4 2h2v2h2v2h2v2h2v2h-2v2H8v2H6v2H4v2h2v-2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v2h-2v-2h-2v-2h-2v-2h-2v-2h2V8h2V6h2V4h2V2h-2v2h-2v2h-2v2h-2v2h-2V8H8V6H6V4H4z" />
    </svg>
  );
}

function File({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="file"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M4 2h10v2h2v2h2v2h2v14H4zm2 2v16h12V10h-4V8h-2V6h-2V4zm8 2v2h2V6z" />
    </svg>
  );
}

export const PixelArtIcons: IconSet = {
  star: Star,
  fork: Fork,
  commit: Commit,
  "pull-request": PullRequest,
  issue: Issue,
  contribution: Contribution,
  repo: Repo,
  gist: Gist,
  file: File,
};
