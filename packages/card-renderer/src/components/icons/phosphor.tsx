import type { IconProps, IconSet } from "./types";

function Star({ color, size = 16 }: IconProps) {
  return (
    <svg
      aria-label="star"
      fill={color}
      height={size}
      role="img"
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34l13.49-58.54L21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M224,64a32,32,0,1,0-40,31v17a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V95a32,32,0,1,0-16,0v17a24,24,0,0,0,24,24h40v25a32,32,0,1,0,16,0V136h40a24,24,0,0,0,24-24V95A32.06,32.06,0,0,0,224,64ZM48,64A16,16,0,1,1,64,80,16,16,0,0,1,48,64Zm96,128a16,16,0,1,1-16-16A16,16,0,0,1,144,192Zm48-112a16,16,0,1,1,16-16A16,16,0,0,1,192,80Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M248,120H183.42a56,56,0,0,0-110.84,0H8a8,8,0,0,0,0,16H72.58a56,56,0,0,0,110.84,0H248a8,8,0,0,0,0-16ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M104,64A32,32,0,1,0,64,95v66a32,32,0,1,0,16,0V95A32.06,32.06,0,0,0,104,64ZM56,64A16,16,0,1,1,72,80,16,16,0,0,1,56,64Zm32,128a16,16,0,1,1-16-16A16,16,0,0,1,88,192Zm136,0a32,32,0,1,1-40-31V110.63L139.31,66a8,8,0,0,1,11.32-11.32L194.34,98.3a8,8,0,0,1,0,11.32L150.63,153.3a8,8,0,0,1-11.32-11.32L176,105.37V161A32.06,32.06,0,0,1,224,192Zm-16,0a16,16,0,1,0-16,16A16,16,0,0,0,208,192Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M240,128a8,8,0,0,1-8,8H204.94l-37.78,75.58A8,8,0,0,1,160,216h-.4a8,8,0,0,1-7.08-5.14L95.35,60.76,63.28,131.31A8,8,0,0,1,56,136H24a8,8,0,0,1,0-16H50.85L88.72,36.69a8,8,0,0,1,14.76.46l57.51,151,31.85-63.71A8,8,0,0,1,200,120h32A8,8,0,0,1,240,128Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
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
      viewBox="0 0 256 256"
      width={size}
    >
      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
    </svg>
  );
}

export const PhosphorIcons: IconSet = {
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
