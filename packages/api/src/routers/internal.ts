import {
  langsData,
  repoData,
  statsData,
  userData,
  userRepos,
  validateUser,
} from "../procedures/internal";

export const internalRouter = {
  validateUser,
  userData,
  userRepos,
  statsData,
  langsData,
  repoData,
};

export type InternalRouter = typeof internalRouter;
