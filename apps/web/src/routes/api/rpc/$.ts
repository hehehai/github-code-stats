import { createContext } from "@github-code-stats/api/context";
import { appRouter } from "@github-code-stats/api/routers/index";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { createFileRoute } from "@tanstack/react-router";

// RPC handler uses appRouter for web app functionality
const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

async function handle({ request }: { request: Request }) {
  const context = await createContext({ req: request });

  const rpcResult = await rpcHandler.handle(request, {
    context,
    prefix: "/api/rpc",
  });
  if (rpcResult.response) return rpcResult.response;

  return new Response("Not found", { status: 404 });
}

export const Route = createFileRoute("/api/rpc/$")({
  server: {
    handlers: {
      DELETE: handle,
      GET: handle,
      HEAD: handle,
      PATCH: handle,
      POST: handle,
      PUT: handle,
    },
  },
});
