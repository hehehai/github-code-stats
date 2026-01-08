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
      <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.645.54.967.82 1.182c.28.215.63.307 1.33.492l.636.168c2.468.652 3.702.979 3.962 1.923c.26.945-.597 1.93-2.313 3.899l-.443.508c-.484.555-.726.832-.852 1.17c-.127.339-.127.714-.128 1.463l-.001.68c-.002 2.606-.003 3.91-.848 4.479c-.845.57-1.965.048-4.206-.994l-.577-.269c-.654-.305-.981-.457-1.328-.457c-.347 0-.674.152-1.328.457l-.577.27c-2.24 1.04-3.361 1.562-4.206.993c-.845-.569-.846-1.873-.848-4.48l-.001-.679c-.001-.749-.001-1.124-.128-1.462c-.126-.34-.368-.617-.852-1.171l-.443-.508C2.897 11.837 2.04 10.852 2.3 9.908c.26-.945 1.494-1.271 3.962-1.923l.636-.168c.7-.185 1.05-.278 1.33-.492c.28-.215.46-.537.82-1.182l.328-.588Z" />
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
      <path
        clipRule="evenodd"
        d="M12 3.25a.75.75 0 0 1 .75.75v6.5H18a.75.75 0 0 1 0 1.5h-5.25v6.5h3.5V17a.75.75 0 0 1 1.5 0v2.25a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1-.75-.75V12H6a.75.75 0 0 1 0-1.5h5.25V4a.75.75 0 0 1 .75-.75Z"
        fillRule="evenodd"
      />
      <path d="M7 17a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm0-10a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
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
      <path
        clipRule="evenodd"
        d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5ZM6.323 11.25a5.751 5.751 0 0 1 11.354 0H22a.75.75 0 0 1 0 1.5h-4.323a5.751 5.751 0 0 1-11.354 0H2a.75.75 0 0 1 0-1.5h4.323Z"
        fillRule="evenodd"
      />
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
      <path d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" />
      <path
        clipRule="evenodd"
        d="M5.75 9v6a.75.75 0 0 1-1.5 0V9h1.5Zm12.5 0v5.25H15a.75.75 0 0 0 0 1.5h3.25V15h1.5v.75a.75.75 0 0 1-.75.75h-1v-1.5a.75.75 0 0 0-1.5 0V18H15a2.25 2.25 0 0 1 0-4.5h1.75V9h1.5Z"
        fillRule="evenodd"
      />
      <path d="M16 5.5a1 1 0 1 0 0 2h2.086l-4.293 4.293a1 1 0 0 0 1.414 1.414L19.5 8.914V11a1 1 0 1 0 2 0V6a.5.5 0 0 0-.5-.5h-5Z" />
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
      <path d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z" />
      <path
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0Z"
        fillRule="evenodd"
      />
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
      <path d="M22 12.25a.75.75 0 0 1-.75.75h-2.522l-4.508 7.967a.75.75 0 0 1-1.344-.068l-4.06-9.78l-2.61 5.401a.75.75 0 0 1-.676.426H2.75a.75.75 0 0 1 0-1.5h2.316l3.14-6.5a.75.75 0 0 1 1.396.063l4.014 9.671l3.908-6.904a.75.75 0 0 1 .652-.38h3.074a.75.75 0 0 1 .75.75v.109Z" />
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
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm2.5-1a1 1 0 0 0-1 1V18h13v-13a1 1 0 0 0-1-1H6.5Z" />
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
      <path
        clipRule="evenodd"
        d="M14.39 4.312a.75.75 0 0 1 .546.912l-3.5 14a.75.75 0 1 1-1.456-.364l3.5-14a.75.75 0 0 1 .91-.548Z"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M6.97 7.97a.75.75 0 0 1 0 1.06l-2.97 2.97l2.97 2.97a.75.75 0 0 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Zm10.06 0a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.97-2.97l-2.97-2.97a.75.75 0 0 1 0-1.06Z"
        fillRule="evenodd"
      />
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
      <path d="M3 7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C4.9 3 5.6 3 7 3h6.172a3 3 0 0 1 2.12.879l4.83 4.828A3 3 0 0 1 21 10.828V17c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.093C19.1 21 18.4 21 17 21H7c-1.4 0-2.1 0-2.635-.272a2.5 2.5 0 0 1-1.093-1.093C3 19.1 3 18.4 3 17V7Z" />
      <path
        d="M21 10.5h-4A2.5 2.5 0 0 1 14.5 8V3"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export const SolarIcons: IconSet = {
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
