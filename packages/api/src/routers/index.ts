import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import { gist, pin, stats, topLangs } from "../procedures";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  stats,
  topLangs,
  pin,
  gist,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
