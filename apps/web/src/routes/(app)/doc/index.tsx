import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiEndpoints, cacheInfo } from "@/lib/api-docs";
import { createPageMeta } from "@/lib/seo";

function CopyIcon() {
  return (
    <svg
      aria-label="Copy"
      className="size-4"
      fill="none"
      role="img"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-label="Copied"
      className="size-4"
      fill="none"
      role="img"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12.75l6 6 9-13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <code className="block overflow-x-auto rounded-md bg-muted p-3 pr-12 font-mono text-sm">
        {code}
      </code>
      <button
        className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted-foreground/10 hover:text-foreground"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy to clipboard"}
        type="button"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

export const Route = createFileRoute("/(app)/doc/")({
  component: DocIndex,
  head: () =>
    createPageMeta({
      description:
        "Complete API documentation for GitHub Code Stats. Learn how to generate stats cards, top languages, pinned repos, and gist cards for your profile.",
      path: "/doc",
      title: "API Documentation",
    }),
});

const endpointRoutes = {
  gist: "/doc/gist",
  pin: "/doc/pin",
  stats: "/doc/stats",
  "top-langs": "/doc/top-langs",
} as const;

function DocIndex() {
  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="font-bold text-2xl">API Documentation</h1>
          <p className="mt-2 text-muted-foreground">
            Generate beautiful, customizable SVG cards for your GitHub profile.
            All endpoints return SVG images that can be embedded in markdown or
            HTML.
          </p>
        </div>

        <Separator />

        {/* Base URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`${typeof window === "undefined" ? "" : window.location.origin}/api/v1`}
            />
            <p className="mt-3 text-muted-foreground text-sm">
              All API endpoints are prefixed with this base URL. Cards are
              returned as SVG images with appropriate caching headers.
            </p>
          </CardContent>
        </Card>

        {/* Cache Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{cacheInfo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground text-sm">
              {cacheInfo.description}
            </p>
            <div className="space-y-3">
              {cacheInfo.items.map((item) => (
                <div key={item.title}>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Common Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground text-sm">
              These parameters are available across all endpoints for
              customization.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
                  theme
                </code>
                <span className="text-muted-foreground text-sm">
                  Pre-built color themes (default, dark, radical, tokyonight,
                  etc.)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
                  font
                </code>
                <span className="text-muted-foreground text-sm">
                  Font family for card text (google-sans-flex, jetbrains-mono,
                  etc.)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
                  border_radius
                </code>
                <span className="text-muted-foreground text-sm">
                  Card corner radius in pixels (0-50)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
                  refresh
                </code>
                <span className="text-muted-foreground text-sm">
                  Set to true to bypass cache and regenerate the card
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div>
          <h2 className="mb-4 font-semibold text-lg">Available Endpoints</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {apiEndpoints.map((endpoint) => (
              <Link
                key={endpoint.id}
                to={endpointRoutes[endpoint.id as keyof typeof endpointRoutes]}
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-xs">
                        {endpoint.method}
                      </span>
                      <CardTitle className="text-base">
                        {endpoint.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <code className="mb-2 block text-muted-foreground text-xs">
                      {endpoint.path}
                    </code>
                    <p className="line-clamp-2 text-muted-foreground text-sm">
                      {endpoint.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Usage Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-muted-foreground text-sm">
              Add a stats card to your GitHub README:
            </p>
            <CodeBlock
              code={`![GitHub Stats](${typeof window === "undefined" ? "" : window.location.origin}/api/v1?username=YOUR_USERNAME)`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
