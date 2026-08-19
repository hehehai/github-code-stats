const GITHUB_API_URL = "https://api.github.com/graphql";

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown>,
  token: string
): Promise<T> {
  const response = await fetch(GITHUB_API_URL, {
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "github-code-stats",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors && result.errors.length > 0) {
    const firstError = result.errors[0];
    throw new Error(`GraphQL error: ${firstError?.message ?? "Unknown error"}`);
  }

  return result.data;
}
