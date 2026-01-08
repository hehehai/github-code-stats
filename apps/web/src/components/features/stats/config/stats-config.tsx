import { ColorPickerButton } from "@/components/shared/color-picker-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const hideOptions = [
  { value: "stars", label: "Stars" },
  { value: "commits", label: "Commits" },
  { value: "prs", label: "Pull Requests" },
  { value: "issues", label: "Issues" },
  { value: "contribs", label: "Contributions" },
];

const iconSets = [
  { value: "default", label: "Default" },
  { value: "hugeicons", label: "HugeIcons" },
  { value: "lucide", label: "Lucide" },
  { value: "heroicons", label: "HeroIcons" },
  { value: "solar", label: "Solar" },
  { value: "tabler", label: "Tabler" },
  { value: "phosphor", label: "Phosphor" },
  { value: "pixelarticons", label: "PixelartIcons" },
];

type IconSetKey =
  | "default"
  | "hugeicons"
  | "lucide"
  | "heroicons"
  | "solar"
  | "tabler"
  | "phosphor"
  | "pixelarticons";

export interface StatsConfig {
  count_private: boolean;
  hide: string[];
  hide_rank: boolean;
  icon_color?: string;
  include_all_commits: boolean;
  ring_color?: string;
  show_icons: boolean;
  icon_set: IconSetKey;
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
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="icon_set">Icon Style</Label>
        <Select
          onValueChange={(value) =>
            value && updateConfig("icon_set", value as IconSetKey)
          }
          value={config.icon_set}
        >
          <SelectTrigger id="icon_set">
            <SelectValue className="w-33" />
          </SelectTrigger>
          <SelectContent>
            {iconSets.map((iconSet) => (
              <SelectItem key={iconSet.value} value={iconSet.value}>
                {iconSet.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Icon Color</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("icon_color", value)}
            placeholder="#4c71f2"
            value={config.icon_color}
          />
        </div>
        <div className="space-y-2">
          <Label>Ring Color</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("ring_color", value)}
            placeholder="#2f80ed"
            value={config.ring_color}
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
