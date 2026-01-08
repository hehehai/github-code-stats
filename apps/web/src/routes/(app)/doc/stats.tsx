import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/stats")({
  head: () =>
    createPageMeta({
      title: "Stats API",
      path: "/doc/stats",
      description:
        "Generate GitHub stats cards showing your contributions, stars, commits, PRs, issues, and overall rank. Customize themes, colors, and layout.",
    }),
  component: () => <EndpointDetail endpointId="stats" />,
});
