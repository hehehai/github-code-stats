"use client";

import { useMemo } from "react";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";

interface Language {
  name: string;
  color: string;
  size?: number;
  percentage?: number;
}

interface LanguageMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  languages: Language[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
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
        value: lang.name.toLowerCase(),
        label: lang.name,
        color: lang.color,
        description: lang.percentage
          ? `${lang.percentage.toFixed(1)}%`
          : undefined,
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
