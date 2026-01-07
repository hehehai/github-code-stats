import { ChartIcon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UsernameInput } from "@/components/shared/username-input";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", params: undefined },
  { href: "/stats/$username", label: "Stats", params: { username: "hehehai" } },
  { href: "/doc", label: "Doc", params: undefined },
  { href: "/about", label: "About", params: undefined },
] as const;

export function Header() {
  const location = useLocation();
  const isStatsPage = location.pathname.startsWith("/stats");

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href.split("/").slice(0, 2).join("/"));
  };

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex flex-1 items-center gap-6">
          <Link className="flex items-center gap-2" to="/">
            <HugeiconsIcon icon={ChartIcon} size={20} />
            <span className="font-semibold">GitHub Stats</span>
          </Link>
          <Separator
            className="h-4 data-[orientation=vertical]:self-center"
            orientation="vertical"
          />
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted",
                  isActive(item.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
                key={item.href}
                params={item.params}
                to={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {isStatsPage && (
            <div className="mx-6 max-w-sm flex-1">
              <UsernameInput
                autoRedirect
                placeholder="Search GitHub user"
                size="default"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <a
            aria-label="GitHub repository"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            href="https://github.com/hehehai/github-code-stats"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HugeiconsIcon icon={Github01Icon} size={16} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
