import {
  langsData,
  repoData,
  statsData,
  userData,
  userRepos,
  validateUser,
} from "../procedures/internal";

export const internalRouter = {
  langsData,
  repoData,
  statsData,
  userData,
  userRepos,
  validateUser,
};

export type InternalRouter = typeof internalRouter;
