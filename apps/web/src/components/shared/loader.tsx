import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const loaderVariants = cva("flex items-center justify-center", {
  defaultVariants: {
    size: "default",
    variant: "min",
  },
  variants: {
    size: {
      default: "",
      lg: "",
      sm: "",
      xl: "",
    },
    variant: {
      full: "h-full pt-8",
      min: "min-h-50",
    },
  },
});

const spinnerSizes = {
  default: 24,
  lg: 32,
  sm: 16,
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
      className={cn(loaderVariants({ className, variant }))}
      data-slot="loader"
      {...props}
    >
      <Spinner size={spinnerSizes[size ?? "default"]} />
    </div>
  );
}

export { Loader, loaderVariants };
