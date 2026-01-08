import { createFileRoute } from "@tanstack/react-router";

import { EndpointDetail } from "@/components/doc/endpoint-detail";

export const Route = createFileRoute("/(app)/doc/pin")({
  component: () => <EndpointDetail endpointId="pin" />,
});
