import { LanguageMultiSelect } from "@/components/shared/language-multi-select";
import { RepoMultiSelect } from "@/components/shared/repo-multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const layouts = [
  { label: "Compact", value: "compact" },
  { label: "Normal", value: "normal" },
  { label: "Pie Chart", value: "pie" },
  { label: "Donut Chart", value: "donut" },
];

interface Repo {
  description: string | null;
  language: string | null;
  name: string;
  stars: number;
}

interface Language {
  color: string;
  name: string;
  percentage?: number;
  size?: number;
}

export interface TopLangsConfig {
  exclude_repo?: string;
  hide?: string;
  langs_count: number;
  layout: string;
}

interface TopLangsConfigPanelProps {
  config: TopLangsConfig;
  isLoading?: boolean;
  languages?: Language[];
  onChange: (config: Partial<TopLangsConfig>) => void;
  repos?: Repo[];
}

export function TopLangsConfigPanel({
  config,
  onChange,
  repos = [],
  languages = [],
  isLoading = false,
}: TopLangsConfigPanelProps) {
  const updateConfig = <K extends keyof TopLangsConfig>(
    key: K,
    value: TopLangsConfig[K]
  ) => {
    onChange({ [key]: value });
  };

  // Convert comma-separated string to array
  const excludeRepoArray = config.exclude_repo
    ? config.exclude_repo
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const hideLanguagesArray = config.hide
    ? config.hide
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : [];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="layout">Layout</Label>
        <Select
          onValueChange={(value) => value && updateConfig("layout", value)}
          value={config.layout}
        >
          <SelectTrigger id="layout">
            <SelectValue className="w-33" />
          </SelectTrigger>
          <SelectContent>
            {layouts.map((layout) => (
              <SelectItem key={layout.value} value={layout.value}>
                {layout.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="langs_count">Languages Count (1-20)</Label>
        <Input
          id="langs_count"
          max={20}
          min={1}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value, 10);
            if (!Number.isNaN(value) && value >= 1 && value <= 20) {
              updateConfig("langs_count", value);
            }
          }}
          type="number"
          value={config.langs_count}
        />
      </div>

      <div className="space-y-2">
        <Label>Exclude Repos</Label>
        <RepoMultiSelect
          disabled={isLoading}
          onChange={(values) => {
            updateConfig(
              "exclude_repo",
              values.length > 0 ? values.join(",") : undefined
            );
          }}
          placeholder={
            isLoading
              ? "Loading repositories..."
              : "Select repositories to exclude..."
          }
          repos={repos}
          value={excludeRepoArray}
        />
      </div>

      <div className="space-y-2">
        <Label>Hide Languages</Label>
        <LanguageMultiSelect
          disabled={isLoading}
          languages={languages}
          onChange={(values) => {
            updateConfig(
              "hide",
              values.length > 0 ? values.join(",") : undefined
            );
          }}
          placeholder={
            isLoading ? "Loading languages..." : "Select languages to hide..."
          }
          value={hideLanguagesArray}
        />
      </div>
    </div>
  );
}
