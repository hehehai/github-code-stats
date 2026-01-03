interface IconProps {
  color: string;
  size?: number;
}

export function StarIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="stars"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
    </svg>
  );
}

export function ForkIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="forks"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
    </svg>
  );
}

export function CommitIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="commits"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
    </svg>
  );
}

export function PullRequestIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="pull requests"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
    </svg>
  );
}

export function IssueIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="issues"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
    </svg>
  );
}

export function ContributionIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="contributions"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
    </svg>
  );
}

export function RepoIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="repository"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5zm-8 10h8v1h-8a1 1 0 010-2z" />
    </svg>
  );
}

export function GistIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="gist"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm9.22 3.72a.75.75 0 000 1.06L10.69 8 9.22 9.47a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.78 6.53a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.31 8l1.47-1.47z" />
    </svg>
  );
}

export function FileIcon({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="file"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073H3.75z" />
    </svg>
  );
}
