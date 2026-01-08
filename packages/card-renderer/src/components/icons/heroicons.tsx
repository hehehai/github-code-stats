import type { IconProps, IconSet } from "./types";

function Star({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="star"
      fill="none"
      height={size}
      role="img"
      stroke={color}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 0V3m0 12v6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const HeroIcons: IconSet = {
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
