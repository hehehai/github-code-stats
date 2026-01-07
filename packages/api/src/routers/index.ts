import type { RouterClient } from "@orpc/server";

export { internalRouter } from "./internal";

import { internalRouter } from "./internal";

export const appRouter = {
  ...internalRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
