import type { GistData, RepoData } from "../types";
import { languageColors } from "../utils/language-colors";
import { graphqlRequest } from "./github";

const REPO_QUERY = `
query repoData($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    name
    owner {
      login
    }
    description
    primaryLanguage {
      name
      color
    }
    stargazerCount
    forkCount
    isArchived
    isTemplate
  }
}
`;

const GIST_QUERY = `
query gistData($gistId: String!) {
  viewer {
    gist(name: $gistId) {
      name
      description
      files {
        name
        language {
          name
        }
      }
      stargazerCount
      forks {
        totalCount
      }
      createdAt
    }
  }
}
`;

interface RepoQueryResponse {
  repository: {
    name: string;
    owner: {
      login: string;
    };
    description: string | null;
    primaryLanguage: {
      name: string;
      color: string | null;
    } | null;
    stargazerCount: number;
    forkCount: number;
    isArchived: boolean;
    isTemplate: boolean;
  } | null;
}

interface GistQueryResponse {
  viewer: {
    gist: {
      name: string;
      description: string | null;
      files: Array<{
        name: string;
        language: {
          name: string;
        } | null;
      }>;
      stargazerCount: number;
      forks: {
        totalCount: number;
      };
      createdAt: string;
    } | null;
  };
}

export async function fetchRepo(
  owner: string,
  repo: string,
  token: string
): Promise<RepoData> {
  const data = await graphqlRequest<RepoQueryResponse>(
    REPO_QUERY,
    { owner, repo },
    token
  );

  if (!data.repository) {
    throw new Error(`Repository "${owner}/${repo}" not found`);
  }

  const repoData = data.repository;

  return {
    name: repoData.name,
    owner: repoData.owner.login,
    description: repoData.description,
    primaryLanguage: repoData.primaryLanguage
      ? {
          name: repoData.primaryLanguage.name,
          color:
            repoData.primaryLanguage.color ||
            languageColors[repoData.primaryLanguage.name] ||
            "#858585",
        }
      : null,
    stargazerCount: repoData.stargazerCount,
    forkCount: repoData.forkCount,
    isArchived: repoData.isArchived,
    isTemplate: repoData.isTemplate,
  };
}

export async function fetchGist(
  gistId: string,
  token: string
): Promise<GistData> {
  const data = await graphqlRequest<GistQueryResponse>(
    GIST_QUERY,
    { gistId },
    token
  );

  if (!data.viewer.gist) {
    throw new Error(`Gist "${gistId}" not found`);
  }

  const gist = data.viewer.gist;

  return {
    id: gist.name,
    description: gist.description,
    files: gist.files.map((f) => ({
      name: f.name,
      language: f.language?.name || null,
    })),
    stargazerCount: gist.stargazerCount,
    forkCount: gist.forks.totalCount,
    createdAt: gist.createdAt,
  };
}
