import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import {
  gist,
  langsData,
  pin,
  repoData,
  stats,
  statsData,
  topLangs,
  userData,
  userRepos,
  validateUser,
} from "../procedures";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  stats,
  topLangs,
  pin,
  gist,
  validateUser,
  userData,
  userRepos,
  statsData,
  langsData,
  repoData,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
