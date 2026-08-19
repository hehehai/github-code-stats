import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/top-langs")({
  component: () => <EndpointDetail endpointId="top-langs" />,
  head: () =>
    createPageMeta({
      description:
        "Generate cards displaying your most used programming languages on GitHub. Customize layout, colors, and exclude specific languages.",
      path: "/doc/top-langs",
      title: "Top Languages API",
    }),
});
