import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/gist")({
  component: () => <EndpointDetail endpointId="gist" />,
  head: () =>
    createPageMeta({
      description:
        "Generate cards for your GitHub Gists. Display gist description, files, stars, and forks with customizable themes and colors.",
      path: "/doc/gist",
      title: "Gist API",
    }),
});
