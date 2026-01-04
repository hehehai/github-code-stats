import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CardPreviewLoading() {
  return (
    <div className="flex aspect-[495/195] items-center justify-center rounded-lg border border-border bg-muted/50">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export function CardPreviewError({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-[495/195] items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground text-sm",
        className
      )}
    >
      {error}
    </div>
  );
}

export function CardPreviewEmpty({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-[495/195] items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground text-sm",
        className
      )}
    >
      {message}
    </div>
  );
}
