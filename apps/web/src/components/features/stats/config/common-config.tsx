import { ColorPickerButton } from "@/components/shared/color-picker-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const themes = [
  { value: "default", label: "Default" },
  { value: "dark", label: "Dark" },
  { value: "radical", label: "Radical" },
  { value: "tokyonight", label: "Tokyo Night" },
  { value: "dracula", label: "Dracula" },
  { value: "nord", label: "Nord" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "onedark", label: "One Dark" },
  { value: "cobalt", label: "Cobalt" },
  { value: "synthwave", label: "Synthwave" },
  { value: "highcontrast", label: "High Contrast" },
  { value: "github_dark", label: "GitHub Dark" },
  { value: "github_light", label: "GitHub Light" },
  { value: "catppuccin_mocha", label: "Catppuccin Mocha" },
  { value: "catppuccin_latte", label: "Catppuccin Latte" },
];

const fonts = [
  { value: "google-sans-flex", label: "Google Sans Flex" },
  { value: "inter", label: "Inter" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "fira-code", label: "Fira Code" },
  { value: "geist-mono", label: "Geist Mono" },
  { value: "maple-mono", label: "Maple Mono" },
];

const emojiSets = [
  { value: "twitter", label: "Twitter" },
  { value: "openmoji", label: "OpenMoji" },
  { value: "noto", label: "Noto Emoji" },
  { value: "fluent", label: "Fluent Emoji Flat" },
];

type FontKey =
  | "google-sans-flex"
  | "jetbrains-mono"
  | "fira-code"
  | "geist-mono"
  | "maple-mono"
  | "inter";

type EmojiSetKey = "twitter" | "openmoji" | "noto" | "fluent";

export interface CommonConfig {
  bg_color?: string;
  border_color?: string;
  font: FontKey;
  hide_border: boolean;
  hide_title: boolean;
  text_color?: string;
  theme: string;
  title_color?: string;
  emoji_set: EmojiSetKey;
  border_radius: number;
}

interface CommonConfigPanelProps {
  config: CommonConfig;
  onChange: (config: Partial<CommonConfig>) => void;
}

export function CommonConfigPanel({
  config,
  onChange,
}: CommonConfigPanelProps) {
  const updateConfig = <K extends keyof CommonConfig>(
    key: K,
    value: CommonConfig[K]
  ) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          onValueChange={(value) => value && updateConfig("theme", value)}
          value={config.theme}
        >
          <SelectTrigger id="theme">
            <SelectValue className="w-33" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label className="mb-2" htmlFor="font">
            Font
          </Label>
          <Select
            onValueChange={(value) =>
              value && updateConfig("font", value as FontKey)
            }
            value={config.font}
          >
            <SelectTrigger id="font">
              <SelectValue className="w-33" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label className="mb-2" htmlFor="emoji_set">
            Emoji Style
          </Label>
          <Select
            onValueChange={(value) =>
              value && updateConfig("emoji_set", value as EmojiSetKey)
            }
            value={config.emoji_set}
          >
            <SelectTrigger id="emoji_set">
              <SelectValue className="w-33" />
            </SelectTrigger>
            <SelectContent>
              {emojiSets.map((emojiSet) => (
                <SelectItem key={emojiSet.value} value={emojiSet.value}>
                  {emojiSet.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="border_radius">Border Radius</Label>
        <Input
          id="border_radius"
          max={50}
          min={0}
          onChange={(e) =>
            updateConfig("border_radius", Number(e.target.value))
          }
          type="number"
          value={config.border_radius}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title Color</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("title_color", value)}
            placeholder="#2f80ed"
            value={config.title_color}
          />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("text_color", value)}
            placeholder="#434d58"
            value={config.text_color}
          />
        </div>
        <div className="space-y-2">
          <Label>Background</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("bg_color", value)}
            placeholder="#ffffff"
            value={config.bg_color}
          />
        </div>
        <div className="space-y-2">
          <Label>Border</Label>
          <ColorPickerButton
            onChange={(value) => updateConfig("border_color", value)}
            placeholder="#e4e2e2"
            value={config.border_color}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="hide_border">Hide Border</Label>
        <Switch
          checked={config.hide_border}
          id="hide_border"
          onCheckedChange={(checked) => updateConfig("hide_border", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="hide_title">Hide Title</Label>
        <Switch
          checked={config.hide_title}
          id="hide_title"
          onCheckedChange={(checked) => updateConfig("hide_title", checked)}
        />
      </div>
    </div>
  );
}
