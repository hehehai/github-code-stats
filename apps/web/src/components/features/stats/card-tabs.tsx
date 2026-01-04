import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CardTab = "stats" | "topLangs" | "pin";

interface CardTabsProps {
  onChange: (tab: CardTab) => void;
  value: CardTab;
}

export function CardTabs({ onChange, value }: CardTabsProps) {
  return (
    <Tabs onValueChange={(v) => onChange(v as CardTab)} value={value}>
      <TabsList>
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="topLangs">Top Languages</TabsTrigger>
        <TabsTrigger value="pin">Repo Pin</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
