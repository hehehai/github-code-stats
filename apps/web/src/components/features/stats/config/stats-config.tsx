import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const hideOptions = [
  { value: "stars", label: "Stars" },
  { value: "commits", label: "Commits" },
  { value: "prs", label: "Pull Requests" },
  { value: "issues", label: "Issues" },
  { value: "contribs", label: "Contributions" },
];

export interface StatsConfig {
  count_private: boolean;
  hide: string[];
  hide_rank: boolean;
  icon_color?: string;
  include_all_commits: boolean;
  ring_color?: string;
  show_icons: boolean;
}

interface StatsConfigPanelProps {
  config: StatsConfig;
  onChange: (config: Partial<StatsConfig>) => void;
}

export function StatsConfigPanel({ config, onChange }: StatsConfigPanelProps) {
  const updateConfig = <K extends keyof StatsConfig>(
    key: K,
    value: StatsConfig[K]
  ) => {
    onChange({ [key]: value });
  };

  const toggleHide = (value: string) => {
    const newHide = config.hide.includes(value)
      ? config.hide.filter((v) => v !== value)
      : [...config.hide, value];
    updateConfig("hide", newHide);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon_color">Icon Color</Label>
          <Input
            id="icon_color"
            onChange={(e) =>
              updateConfig("icon_color", e.target.value || undefined)
            }
            placeholder="#4c71f2"
            value={config.icon_color ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ring_color">Ring Color</Label>
          <Input
            id="ring_color"
            onChange={(e) =>
              updateConfig("ring_color", e.target.value || undefined)
            }
            placeholder="#2f80ed"
            value={config.ring_color ?? ""}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show_icons">Show Icons</Label>
        <Switch
          checked={config.show_icons}
          id="show_icons"
          onCheckedChange={(checked) => updateConfig("show_icons", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="hide_rank">Hide Rank</Label>
        <Switch
          checked={config.hide_rank}
          id="hide_rank"
          onCheckedChange={(checked) => updateConfig("hide_rank", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="include_all_commits">Include All Commits</Label>
        <Switch
          checked={config.include_all_commits}
          id="include_all_commits"
          onCheckedChange={(checked) =>
            updateConfig("include_all_commits", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="count_private">Count Private</Label>
        <Switch
          checked={config.count_private}
          id="count_private"
          onCheckedChange={(checked) => updateConfig("count_private", checked)}
        />
      </div>

      <div className="space-y-2">
        <Label>Hide Stats</Label>
        <div className="grid grid-cols-2 gap-2">
          {hideOptions.map((option) => (
            <div className="flex items-center gap-2" key={option.value}>
              <Checkbox
                checked={config.hide.includes(option.value)}
                id={`hide-${option.value}`}
                onCheckedChange={() => toggleHide(option.value)}
              />
              <Label
                className="font-normal text-sm"
                htmlFor={`hide-${option.value}`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
