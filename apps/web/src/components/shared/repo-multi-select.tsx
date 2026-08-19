"use client";

import { useMemo } from "react";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";

interface Repo {
  description: string | null;
  language: string | null;
  name: string;
  stars: number;
}

interface RepoMultiSelectProps {
  className?: string;
  disabled?: boolean;
  onChange: (value: string[]) => void;
  placeholder?: string;
  repos: Repo[];
  value: string[];
}

export function RepoMultiSelect({
  value,
  onChange,
  repos,
  placeholder = "Select repositories to exclude...",
  className,
  disabled = false,
}: RepoMultiSelectProps) {
  const options: MultiSelectOption[] = useMemo(
    () =>
      repos.map((repo) => ({
        description: repo.language ?? undefined,
        label: repo.name,
        value: repo.name,
      })),
    [repos]
  );

  return (
    <MultiSelect
      className={className}
      disabled={disabled}
      emptyMessage="No repositories found"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      searchPlaceholder="Search repositories..."
      value={value}
    />
  );
}
