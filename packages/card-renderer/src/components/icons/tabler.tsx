import type { IconProps, IconSet } from "./types";

function Star({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="star"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}

function Fork({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="fork"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" />
      <path d="M12 12l0 4" />
    </svg>
  );
}

function Commit({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="commit"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 3l0 6" />
      <path d="M12 15l0 6" />
    </svg>
  );
}

function PullRequest({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="pull-request"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M6 8l0 8" />
      <path d="M11 6h5a2 2 0 0 1 2 2v8" />
      <path d="M14 9l-3 -3l3 -3" />
    </svg>
  );
}

function Issue({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="issue"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 9v4" />
      <path d="M12 16v.01" />
    </svg>
  );
}

function Contribution({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="contribution"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M3 12h4l3 8l4 -16l3 8h4" />
    </svg>
  );
}

function Repo({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="repo"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M4 20l16 0" />
      <path d="M4 20v-16a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v16" />
      <path d="M12 4v8l3 -3l3 3v-8" />
    </svg>
  );
}

function Gist({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="gist"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function File({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="file"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    </svg>
  );
}

export const TablerIcons: IconSet = {
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
