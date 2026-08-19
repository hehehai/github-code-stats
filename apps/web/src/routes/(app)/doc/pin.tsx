import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";
import { createPageMeta } from "@/lib/seo";

export const Route = createFileRoute("/(app)/doc/pin")({
  component: () => <EndpointDetail endpointId="pin" />,
  head: () =>
    createPageMeta({
      description:
        "Generate pinned repository cards for your GitHub profile. Display repo description, stars, forks, and primary language with customizable themes.",
      path: "/doc/pin",
      title: "Pin API",
    }),
});
