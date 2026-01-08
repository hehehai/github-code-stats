import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { apiEndpoints } from "@/lib/api-docs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(app)/doc")({
  component: DocLayout,
});

const endpointRoutes = {
  stats: "/doc/stats",
  "top-langs": "/doc/top-langs",
  pin: "/doc/pin",
  gist: "/doc/gist",
} as const;

function DocLayout() {
  const location = useLocation();

  const isActive = (endpointId: string) => {
    return location.pathname === `/doc/${endpointId}`;
  };

  return (
    <div className="flex h-[calc(100svh-3.5rem)]">
      {/* Left Sidebar */}
      <aside className="w-64 shrink-0 overflow-hidden border-border border-r">
        <div className="p-4">
          <h2 className="font-semibold text-lg">API Endpoints</h2>
          <p className="text-muted-foreground text-sm">
            Public SVG generation APIs
          </p>
        </div>
        <Separator />
        <nav className="p-2">
          {apiEndpoints.map((endpoint) => (
            <Link
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                isActive(endpoint.id)
                  ? "bg-muted font-medium"
                  : "text-muted-foreground"
              )}
              key={endpoint.id}
              to={endpointRoutes[endpoint.id as keyof typeof endpointRoutes]}
            >
              <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-xs">
                {endpoint.method}
              </span>
              <span>{endpoint.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Right Content Panel */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
