import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const loaderVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      full: "h-full pt-8",
      min: "min-h-50",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    variant: "min",
    size: "default",
  },
});

const spinnerSizes = {
  sm: 16,
  default: 24,
  lg: 32,
  xl: 48,
} as const;

function Loader({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof loaderVariants>) {
  return (
    <div
      className={cn(loaderVariants({ variant, className }))}
      data-slot="loader"
      {...props}
    >
      <Spinner size={spinnerSizes[size ?? "default"]} />
    </div>
  );
}

export { Loader, loaderVariants };
