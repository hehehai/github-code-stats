import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import "./index.css";
import { Loader } from "./components/shared/loader";
import { routeTree } from "./routeTree.gen";
import { orpc, queryClient } from "./utils/orpc";

export const getRouter = () => {
  const router = createTanStackRouter({
    context: { orpc, queryClient },
    defaultNotFoundComponent: () => <div>Not Found</div>,
    defaultPendingComponent: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    ),
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
