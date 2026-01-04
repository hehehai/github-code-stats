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

  // Data fetching for repos (still client-side since it's conditional)
  const { data: reposData } = useQuery(
    orpc.userRepos.queryOptions({
      input: { username },
      enabled: params.tab === "pin",
    })
  );

  const repos = reposData?.repos ?? [];

  // Auto-select first repo if none selected and pin tab active
  if (params.tab === "pin" && !params.repo && repos.length > 0 && repos[0]) {
    updateParams({ repo: repos[0].name });
  }

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
          <div className="flex items-center justify-between">
            <UserInfo
              avatarUrl={userData.avatarUrl}
              bio={userData.bio}
              name={userData.name}
              username={username}
            />
            <CopyLinkButton
              cardTitle={`${username}'s GitHub Stats`}
              getUrl={() => apiUrl}
            />
          </div>

          <CardTabs
            onChange={(tab: CardTab) => updateParams({ tab })}
            value={params.tab}
          />

          <CardPreview
            cardTab={params.tab}
            commonConfig={params}
            pinConfig={params}
            statsConfig={params}
            topLangsConfig={params}
            username={username}
          />
        </div>

        <div className="w-[400px] shrink-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
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
            <CardHeader className="pb-3">
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
                  onChange={(config) =>
                    updateParams({
                      ...config,
                      hide_langs: config.hide,
                    })
                  }
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
