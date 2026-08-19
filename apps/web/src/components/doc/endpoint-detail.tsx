import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type ApiEndpoint,
  type ApiParameter,
  apiEndpoints,
  cacheInfo,
} from "@/lib/api-docs";
import { cn } from "@/lib/utils";

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

function CodeBlock({ code, label }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <p className="mb-2 text-muted-foreground text-sm">{label}</p>
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
    </div>
  );
}

function ParameterRow({ param }: { param: ApiParameter }) {
  const [showEnum, setShowEnum] = useState(false);
  const hasEnum = param.enum && param.enum.length > 0;
  const hasRange = param.min !== undefined || param.max !== undefined;

  return (
    <div className="border-border border-b pb-4 last:border-0 last:pb-0">
      <div className="grid grid-cols-[200px_1fr] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-sm">{param.name}</code>
            {param.required && (
              <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-destructive text-xs">
                required
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-muted-foreground text-xs">
            <span className="font-mono">{param.type}</span>
            {param.default && (
              <span>
                default: <code>{param.default}</code>
              </span>
            )}
            {hasRange && (
              <span>
                range:{" "}
                <code>
                  {param.min ?? ""}
                  {param.min !== undefined && param.max !== undefined
                    ? "-"
                    : ""}
                  {param.max ?? "+"}
                </code>
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{param.description}</p>
          {hasEnum && (
            <div className="mt-2">
              <button
                className="text-muted-foreground text-xs hover:text-foreground"
                onClick={() => setShowEnum(!showEnum)}
                type="button"
              >
                {showEnum ? "▼" : "▶"} {param.enum?.length} options
              </button>
              {showEnum && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {param.enum?.map((value) => (
                    <code
                      className="rounded-md bg-muted px-1.5 py-0.5 text-xs"
                      key={value}
                    >
                      {value}
                    </code>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EndpointDetailContent({ endpoint }: { endpoint: ApiEndpoint }) {
  const baseUrl = typeof window === "undefined" ? "" : window.location.origin;

  const requestUrl = `${baseUrl}${endpoint.example}`;
  const markdownCode = `![${endpoint.name}](${baseUrl}${endpoint.example})`;
  const htmlCode = `<img src="${baseUrl}${endpoint.example}" alt="${endpoint.name}" />`;

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {/* Header */}
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-md border border-border px-2 py-1 font-mono text-sm">
              {endpoint.method}
            </span>
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
              {endpoint.path}
            </code>
          </div>
          <h1 className="font-bold text-2xl">{endpoint.name}</h1>
          <p className="mt-2 text-muted-foreground">{endpoint.description}</p>
        </div>

        <Separator />

        {/* Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endpoint.parameters.map((param) => (
                <ParameterRow key={param.name} param={param} />
              ))}
            </div>
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

        {/* Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <CodeBlock code={requestUrl} label="Request URL" />
              <CodeBlock code={markdownCode} label="Markdown (for README)" />
              <CodeBlock code={htmlCode} label="HTML" />
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center rounded-md border border-border bg-muted/30 p-6">
              <img
                alt={`${endpoint.name} preview`}
                className={cn(
                  "max-w-full",
                  endpoint.id === "stats" && "w-[600px]",
                  endpoint.id === "top-langs" && "w-[400px]",
                  endpoint.id === "pin" && "w-[500px]",
                  endpoint.id === "gist" && "w-[500px]"
                )}
                src={`${baseUrl}${endpoint.example}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function EndpointDetail({ endpointId }: { endpointId: string }) {
  const endpoint = apiEndpoints.find((e) => e.id === endpointId);

  if (!endpoint) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Endpoint not found</p>
      </div>
    );
  }

  return <EndpointDetailContent endpoint={endpoint} />;
}
