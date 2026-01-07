"use client";

import { Combobox } from "@base-ui/react/combobox";
import {
  Cancel01Icon,
  Search01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface MultiSelectOption {
  value: string;
  label: string;
  color?: string;
  description?: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(lowerQuery) ||
        option.value.toLowerCase().includes(lowerQuery) ||
        option.description?.toLowerCase().includes(lowerQuery)
    );
  }, [options, query]);

  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value]
  );

  const handleSelect = (selectedValue: unknown) => {
    if (typeof selectedValue !== "string") return;

    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const handleRemove = (valueToRemove: string) => {
    onChange(value.filter((v) => v !== valueToRemove));
  };

  return (
    <div className={cn("relative", className)}>
      <Combobox.Root
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setQuery("");
        }}
        onValueChange={handleSelect}
        open={open}
        value={null}
      >
        <Combobox.Trigger
          className={cn(
            "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent py-1.5 pr-8 pl-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
            !value.length && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50"
          )}
          disabled={disabled}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
                key={option.value}
              >
                {option.color && (
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                )}
                <span className="truncate">{option.label}</span>
                <button
                  className="ml-0.5 rounded-sm hover:bg-muted-foreground/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                  type="button"
                >
                  <HugeiconsIcon
                    className="size-3 text-muted-foreground"
                    icon={Cancel01Icon}
                    strokeWidth={2}
                  />
                </button>
              </span>
            ))
          ) : (
            <span className="px-0.5">{placeholder}</span>
          )}
        </Combobox.Trigger>
        <Combobox.Portal>
          <Combobox.Positioner
            align="start"
            className="isolate z-50"
            side="bottom"
            sideOffset={4}
          >
            <Combobox.Popup className="data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 relative isolate z-50 max-h-[300px] min-w-[var(--anchor-width)] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in">
              <div className="flex items-center gap-2 border-border border-b px-3 py-2">
                <HugeiconsIcon
                  className="size-4 text-muted-foreground"
                  icon={Search01Icon}
                  strokeWidth={2}
                />
                <Combobox.Input
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  value={query}
                />
              </div>
              <Combobox.List className="max-h-[250px] overflow-y-auto p-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = value.includes(option.value);
                    return (
                      <Combobox.Item
                        className={cn(
                          "relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          isSelected && "bg-accent/50"
                        )}
                        key={option.value}
                        value={option.value}
                      >
                        {option.color && (
                          <span
                            className="size-3 shrink-0 rounded-full"
                            style={{ backgroundColor: option.color }}
                          />
                        )}
                        <span className="flex-1 truncate">{option.label}</span>
                        {option.description && (
                          <span className="shrink-0 text-muted-foreground text-xs">
                            {option.description}
                          </span>
                        )}
                        {isSelected && (
                          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                            <HugeiconsIcon
                              className="pointer-events-none"
                              icon={Tick02Icon}
                              strokeWidth={2}
                            />
                          </span>
                        )}
                      </Combobox.Item>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-muted-foreground text-sm">
                    {emptyMessage}
                  </div>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}

export type { MultiSelectOption, MultiSelectProps };
