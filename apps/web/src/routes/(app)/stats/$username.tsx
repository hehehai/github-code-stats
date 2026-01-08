import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { CardPreview } from "@/components/features/stats/card-preview";
import { type CardTab, CardTabs } from "@/components/features/stats/card-tabs";
import { CommonConfigPanel } from "@/components/features/stats/config/common-config";
import { PinConfigPanel } from "@/components/features/stats/config/pin-config";
import { StatsConfigPanel } from "@/components/features/stats/config/stats-config";
import { TopLangsConfigPanel } from "@/components/features/stats/config/top-langs-config";
import { CopyLinkButton } from "@/components/features/stats/copy-link-button";
import { UserInfo } from "@/components/features/stats/user-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildApiUrl } from "@/lib/api-url-builder";
import { type SearchParams, statsSearchSchema } from "@/lib/search-schema";
import { getUserData } from "@/lib/server/get-user-data";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/(app)/stats/$username")({
  validateSearch: statsSearchSchema,
  loader: async ({ params }) => {
    const userData = await getUserData({ data: params.username });
    return { userData };
  },
  component: StatsComponent,
});

type UpdateParams = Omit<Partial<SearchParams>, "hide"> & {
  hide?: string | string[];
};

function StatsComponent() {
  const { username } = useParams({ from: "/(app)/stats/$username" });
  const params = useSearch({ from: "/(app)/stats/$username" });
  const { userData } = Route.useLoaderData();
  const navigate = useNavigate();

  // Helper to convert hide string to array for UI
  const getHideArray = (hide: string) =>
    hide ? hide.split(",").filter(Boolean) : [];

  // Update URL when params change
  const updateParams = useCallback(
    (newParams: UpdateParams) => {
      const updated: SearchParams = {
        ...params,
        ...newParams,
        hide: params.hide,
      };

      // Handle hide parameter conversion if needed
      if ("hide" in newParams) {
        updated.hide = Array.isArray(newParams.hide)
          ? newParams.hide.join(",")
          : (newParams.hide ?? "");
      }

      navigate({
        to: ".",
        search: updated,
        replace: true,
      });
    },
    [navigate, params]
  );

  // Save to localStorage for persistence across sessions
  useEffect(() => {
    try {
      localStorage.setItem(
        "github-stats-last-settings",
        JSON.stringify(params)
      );
    } catch {
      // Ignore localStorage errors (e.g., in incognito mode)
    }
  }, [params]);

  // Data fetching for repos (needed for pin and topLangs tabs)
  const { data: reposData, isLoading: isReposLoading } = useQuery(
    orpc.userRepos.queryOptions({
      input: { username },
      enabled: params.tab === "pin" || params.tab === "topLangs",
    })
  );

  // Data fetching for languages (needed for topLangs tab)
  const { data: langsData, isLoading: isLangsLoading } = useQuery(
    orpc.langsData.queryOptions({
      input: { username, langs_count: "20" },
      enabled: params.tab === "topLangs",
    })
  );

  const repos = reposData?.repos ?? [];
  const languages = langsData?.languages
    ? Object.values(langsData.languages)
    : [];

  // Auto-select first repo if none selected and pin tab active
  useEffect(() => {
    if (params.tab === "pin" && !params.repo && repos.length > 0 && repos[0]) {
      updateParams({ repo: repos[0].name });
    }
  }, [params.tab, params.repo, repos, updateParams]);

  const apiUrl = buildApiUrl({
    username,
    cardTab: params.tab,
    commonConfig: params,
    statsConfig: params,
    topLangsConfig: params,
    pinConfig: params,
  });

  // Prepare config objects for panels with hide as array
  const statsConfigForPanel = {
    ...params,
    hide: getHideArray(params.hide),
  };
  const topLangsConfigForPanel = {
    ...params,
    hide: params.hide_langs ?? "",
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <UserInfo
              avatarUrl={userData.avatarUrl}
              bio={userData.bio}
              name={userData.name}
              username={username}
            />
          </div>

          <header className="flex items-center justify-between gap-2">
            <CardTabs
              onChange={(tab: CardTab) => updateParams({ tab })}
              value={params.tab}
            />
            <div className="flex items-center gap-2">
              <CopyLinkButton
                cardTitle={`${username}'s GitHub Stats`}
                getUrl={() => apiUrl}
              />
            </div>
          </header>

          <CardPreview
            cardTab={params.tab}
            commonConfig={params}
            pinConfig={params}
            statsConfig={params}
            topLangsConfig={params}
            username={username}
          />
        </div>

        <div className="w-100 shrink-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme & Style</CardTitle>
            </CardHeader>
            <CardContent>
              <CommonConfigPanel
                config={statsConfigForPanel}
                onChange={updateParams}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {params.tab === "stats" && "Stats Options"}
                {params.tab === "topLangs" && "Languages Options"}
                {params.tab === "pin" && "Repository Options"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params.tab === "stats" && (
                <StatsConfigPanel
                  config={statsConfigForPanel}
                  onChange={updateParams}
                />
              )}
              {params.tab === "topLangs" && (
                <TopLangsConfigPanel
                  config={topLangsConfigForPanel}
                  isLoading={isReposLoading || isLangsLoading}
                  languages={languages}
                  onChange={(config) =>
                    updateParams({
                      ...config,
                      hide_langs: config.hide,
                    })
                  }
                  repos={repos}
                />
              )}
              {params.tab === "pin" && (
                <PinConfigPanel
                  config={statsConfigForPanel}
                  isLoading={!reposData && params.tab === "pin"}
                  onChange={updateParams}
                  repos={repos}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
