import { DefaultIcons } from "./default";
import { HeroIcons } from "./heroicons";
import { HugeIcons } from "./hugeicons";
import { LucideIcons } from "./lucide";
import { PhosphorIcons } from "./phosphor";
import { PixelArtIcons } from "./pixelarticons";
import { SolarIcons } from "./solar";
import { TablerIcons } from "./tabler";
import type { IconComponent, IconName, IconSet, IconSetKey } from "./types";

const ICON_SETS: Record<IconSetKey, IconSet> = {
  default: DefaultIcons,
  heroicons: HeroIcons,
  hugeicons: HugeIcons,
  lucide: LucideIcons,
  phosphor: PhosphorIcons,
  pixelarticons: PixelArtIcons,
  solar: SolarIcons,
  tabler: TablerIcons,
};

export function getIcon(
  iconSet: IconSetKey,
  iconName: IconName
): IconComponent {
  const set = ICON_SETS[iconSet] || ICON_SETS.default;
  return set[iconName];
}

export { DefaultIcons } from "./default";
export { HeroIcons } from "./heroicons";
export { HugeIcons } from "./hugeicons";
export { LucideIcons } from "./lucide";
export { PhosphorIcons } from "./phosphor";
export { PixelArtIcons } from "./pixelarticons";
export { SolarIcons } from "./solar";
export { TablerIcons } from "./tabler";
export type {
  IconComponent,
  IconName,
  IconProps,
  IconSet,
  IconSetKey,
} from "./types";
