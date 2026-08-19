import { RepoSelect } from "@/components/shared/repo-select";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

const iconSets = [
  { label: "Default", value: "default" },
  { label: "HugeIcons", value: "hugeicons" },
  { label: "Lucide", value: "lucide" },
  { label: "HeroIcons", value: "heroicons" },
  { label: "Solar", value: "solar" },
  { label: "Tabler", value: "tabler" },
  { label: "Phosphor", value: "phosphor" },
  { label: "PixelartIcons", value: "pixelarticons" },
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

export interface PinConfig {
  icon_set: IconSetKey;
  repo: string;
  show_owner: boolean;
}

interface Repo {
  description: string | null;
  language: string | null;
  name: string;
  stars: number;
}

interface PinConfigPanelProps {
  config: PinConfig;
  isLoading?: boolean;
  onChange: (config: Partial<PinConfig>) => void;
  repos: Repo[];
}

export function PinConfigPanel({
  config,
  isLoading,
  onChange,
  repos,
}: PinConfigPanelProps) {
  const updateConfig = <K extends keyof PinConfig>(
    key: K,
    value: PinConfig[K]
  ) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="repo">Repository</Label>
        {isLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <RepoSelect
            onChange={(value) => updateConfig("repo", value)}
            placeholder="Select a repository"
            repos={repos}
            value={config.repo}
          />
        )}
        {repos.length === 0 && !isLoading && (
          <p className="text-muted-foreground text-xs">No repositories found</p>
        )}
      </div>

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

      <div className="flex items-center justify-between">
        <Label htmlFor="show_owner">Show Owner</Label>
        <Switch
          checked={config.show_owner}
          id="show_owner"
          onCheckedChange={(checked) => updateConfig("show_owner", checked)}
        />
      </div>
    </div>
  );
}
