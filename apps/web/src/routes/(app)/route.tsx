import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export const Route = createFileRoute("/(app)")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const location = useLocation();
  const isStatsPage = location.pathname.startsWith("/stats");

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isStatsPage && <Footer />}
    </div>
  );
}
