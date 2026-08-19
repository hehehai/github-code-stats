"use client";

import { Combobox } from "@base-ui/react/combobox";
import {
  Search01Icon,
  Tick02Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Repo {
  description: string | null;
  language: string | null;
  name: string;
  stars: number;
}

interface RepoSelectProps {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  repos: Repo[];
  value?: string;
}

export function RepoSelect({
  value,
  onChange,
  repos,
  placeholder = "Select a repository",
  className,
}: RepoSelectProps) {
  const [query, setQuery] = useState("");

  const filteredRepos = useMemo(() => {
    if (!query) return repos;
    const lowerQuery = query.toLowerCase();
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(lowerQuery) ||
        repo.language?.toLowerCase().includes(lowerQuery)
    );
  }, [repos, query]);

  const selectedRepo = repos.find((repo) => repo.name === value);

  const handleValueChange = (newValue: unknown) => {
    if (typeof newValue === "string") {
      onChange?.(newValue);
    }
  };

  return (
    <Combobox.Root onValueChange={handleValueChange} value={value ?? null}>
      <Combobox.Trigger
        className={cn(
          "flex h-8 w-full select-none items-center justify-between gap-1.5 whitespace-nowrap rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          !value && "text-muted-foreground",
          className
        )}
      >
        <span className="flex-1 truncate text-left">
          {selectedRepo ? (
            <span className="flex items-center gap-2">
              <span className="truncate">{selectedRepo.name}</span>
              {selectedRepo.language && (
                <span className="text-muted-foreground text-xs">
                  ({selectedRepo.language})
                </span>
              )}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <HugeiconsIcon
          className="pointer-events-none size-4 shrink-0 text-muted-foreground"
          icon={UnfoldMoreIcon}
          strokeWidth={2}
        />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner
          align="start"
          className="isolate z-50"
          side="bottom"
          sideOffset={4}
        >
          <Combobox.Popup className="data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 relative isolate z-50 max-h-[300px] min-w-[320px] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in">
            <div className="flex items-center gap-2 border-border border-b px-3 py-2">
              <HugeiconsIcon
                className="size-4 text-muted-foreground"
                icon={Search01Icon}
                strokeWidth={2}
              />
              <Combobox.Input
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search repositories..."
                value={query}
              />
            </div>
            <Combobox.List className="max-h-[250px] overflow-y-auto p-1">
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repo) => (
                  <Combobox.Item
                    className="relative flex w-full cursor-default select-none items-center gap-1.5 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    key={repo.name}
                    value={repo.name}
                  >
                    <span className="flex flex-1 items-center gap-2 truncate">
                      <span className="truncate">{repo.name}</span>
                      {repo.language && (
                        <span className="shrink-0 text-muted-foreground text-xs">
                          ({repo.language})
                        </span>
                      )}
                    </span>
                    <Combobox.ItemIndicator className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                      <HugeiconsIcon
                        className="pointer-events-none"
                        icon={Tick02Icon}
                        strokeWidth={2}
                      />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))
              ) : (
                <div className="py-6 text-center text-muted-foreground text-sm">
                  No repositories found
                </div>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
