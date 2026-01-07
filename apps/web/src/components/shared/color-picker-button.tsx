"use client";

import { cn } from "@/lib/utils";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "./color-picker";

interface ColorPickerButtonProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}

export function ColorPickerButton({
  value,
  placeholder = "#000000",
  onChange,
  className,
}: ColorPickerButtonProps) {
  const handleValueChange = (newValue: string) => {
    onChange?.(newValue || undefined);
  };

  return (
    <ColorPicker
      defaultValue={placeholder}
      onValueChange={handleValueChange}
      value={value || placeholder}
    >
      <ColorPickerTrigger
        className={cn("w-full justify-start gap-2", className)}
        variant="outline"
      >
        <ColorPickerSwatch className="size-4 shrink-0 rounded-sm" />
        <span
          className={cn("font-mono text-sm", !value && "text-muted-foreground")}
        >
          {value || placeholder}
        </span>
      </ColorPickerTrigger>
      <ColorPickerContent className="w-[280px]">
        <ColorPickerArea />
        <ColorPickerHueSlider />
        <div className="flex items-center gap-2">
          <ColorPickerEyeDropper size="icon" />
          <ColorPickerInput className="flex-1" withoutAlpha />
        </div>
      </ColorPickerContent>
    </ColorPicker>
  );
}
