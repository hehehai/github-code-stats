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
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "pie", label: "Pie Chart" },
  { value: "donut", label: "Donut Chart" },
];

export interface TopLangsConfig {
  exclude_repo?: string;
  hide?: string;
  langs_count: number;
  layout: string;
}

interface TopLangsConfigPanelProps {
  config: TopLangsConfig;
  onChange: (config: Partial<TopLangsConfig>) => void;
}

export function TopLangsConfigPanel({
  config,
  onChange,
}: TopLangsConfigPanelProps) {
  const updateConfig = <K extends keyof TopLangsConfig>(
    key: K,
    value: TopLangsConfig[K]
  ) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="layout">Layout</Label>
        <Select
          onValueChange={(value) => value && updateConfig("layout", value)}
          value={config.layout}
        >
          <SelectTrigger id="layout">
            <SelectValue />
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
        <Label htmlFor="exclude_repo">Exclude Repos</Label>
        <Input
          id="exclude_repo"
          onChange={(e) =>
            updateConfig("exclude_repo", e.target.value || undefined)
          }
          placeholder="repo1, repo2, repo3"
          value={config.exclude_repo ?? ""}
        />
        <p className="text-muted-foreground text-xs">
          Comma-separated list of repos to exclude
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hide">Hide Languages</Label>
        <Input
          id="hide"
          onChange={(e) => updateConfig("hide", e.target.value || undefined)}
          placeholder="javascript, html, css"
          value={config.hide ?? ""}
        />
        <p className="text-muted-foreground text-xs">
          Comma-separated list of languages to hide
        </p>
      </div>
    </div>
  );
}
