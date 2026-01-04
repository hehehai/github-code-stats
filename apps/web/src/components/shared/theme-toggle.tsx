import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "@/components/shared/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      size="icon-sm"
      variant="ghost"
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={Sun01Icon} size={16} />
      ) : (
        <HugeiconsIcon icon={Moon01Icon} size={16} />
      )}
    </Button>
  );
}
