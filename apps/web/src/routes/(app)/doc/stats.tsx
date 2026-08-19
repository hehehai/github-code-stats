import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/stats")({
  component: () => <EndpointDetail endpointId="stats" />,
  head: () =>
    createPageMeta({
      description:
        "Generate GitHub stats cards showing your contributions, stars, commits, PRs, issues, and overall rank. Customize themes, colors, and layout.",
      path: "/doc/stats",
      title: "Stats API",
    }),
});
