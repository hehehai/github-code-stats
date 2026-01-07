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
  value: string[];
  onChange: (value: string[]) => void;
  repos: Repo[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
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
        value: repo.name,
        label: repo.name,
        description: repo.language ?? undefined,
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
