"use client";

import { useMemo } from "react";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";

interface Language {
  color: string;
  name: string;
  percentage?: number;
  size?: number;
}

interface LanguageMultiSelectProps {
  className?: string;
  disabled?: boolean;
  languages: Language[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  value: string[];
}

export function LanguageMultiSelect({
  value,
  onChange,
  languages,
  placeholder = "Select languages to hide...",
  className,
  disabled = false,
}: LanguageMultiSelectProps) {
  const options: MultiSelectOption[] = useMemo(
    () =>
      languages.map((lang) => ({
        color: lang.color,
        description: lang.percentage
          ? `${lang.percentage.toFixed(1)}%`
          : undefined,
        label: lang.name,
        value: lang.name.toLowerCase(),
      })),
    [languages]
  );

  return (
    <MultiSelect
      className={className}
      disabled={disabled}
      emptyMessage="No languages found"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      searchPlaceholder="Search languages..."
      value={value}
    />
  );
}
