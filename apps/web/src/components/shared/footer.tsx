import { AiUserIcon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Footer() {
  return (
    <footer className="border-border border-t py-6">
      <div className="container mx-auto flex items-center justify-between px-4 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <span>Built with React, TanStack, and Cloudflare Workers</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            href="https://hehehai.cn"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HugeiconsIcon icon={AiUserIcon} size={16} />
            <span>hehehai</span>
          </a>
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            href="https://github.com/hehehai/github-code-stats"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HugeiconsIcon icon={Github01Icon} size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
