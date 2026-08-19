import {
  CodeIcon,
  Copy01Icon,
  Link01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildHtmlEmbed, buildMarkdownEmbed } from "@/lib/api-url-builder";

interface CopyLinkButtonProps {
  cardTitle?: string;
  getUrl: () => string;
}

type CopyType = "link" | "markdown" | "html";

export function CopyLinkButton({
  getUrl,
  cardTitle = "GitHub Stats",
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState<CopyType | null>(null);

  const handleCopy = async (type: CopyType) => {
    try {
      const url = getUrl();
      let text: string;
      let message: string;

      switch (type) {
        case "markdown":
          text = buildMarkdownEmbed(url, cardTitle);
          message = "Markdown copied to clipboard";
          break;
        case "html":
          text = buildHtmlEmbed(url, cardTitle);
          message = "HTML copied to clipboard";
          break;
        default:
          text = url;
          message = "Link copied to clipboard";
      }

      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success(message);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="sm" variant="outline">
            {copied ? (
              <HugeiconsIcon icon={Tick01Icon} size={14} />
            ) : (
              <HugeiconsIcon icon={Copy01Icon} size={14} />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleCopy("link")}>
          <HugeiconsIcon icon={Link01Icon} size={14} />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy("markdown")}>
          <HugeiconsIcon icon={CodeIcon} size={14} />
          Copy Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy("html")}>
          <HugeiconsIcon icon={CodeIcon} size={14} />
          Copy HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
