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

export interface PinConfig {
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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="repo">Repository</Label>
        {isLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Select
            onValueChange={(value) => value && updateConfig("repo", value)}
            value={config.repo}
          >
            <SelectTrigger id="repo">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {repos.map((repo) => (
                <SelectItem key={repo.name} value={repo.name}>
                  <div className="flex items-center gap-2">
                    <span>{repo.name}</span>
                    {repo.language && (
                      <span className="text-muted-foreground text-xs">
                        ({repo.language})
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {repos.length === 0 && !isLoading && (
          <p className="text-muted-foreground text-xs">No repositories found</p>
        )}
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
