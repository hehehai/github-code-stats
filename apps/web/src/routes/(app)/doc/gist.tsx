import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/gist")({
  head: () =>
    createPageMeta({
      title: "Gist API",
      path: "/doc/gist",
      description:
        "Generate cards for your GitHub Gists. Display gist description, files, stars, and forks with customizable themes and colors.",
    }),
  component: () => <EndpointDetail endpointId="gist" />,
});
