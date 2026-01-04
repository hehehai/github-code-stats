import { Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/(app)/about")({
  component: AboutComponent,
});

const techStack = [
  { name: "React 19", description: "UI Framework" },
  { name: "TanStack Router", description: "File-based routing" },
  { name: "TanStack Query", description: "Data fetching & caching" },
  { name: "oRPC", description: "Type-safe RPC" },
  { name: "Satori", description: "SVG card rendering" },
  { name: "Tailwind CSS", description: "Styling" },
  { name: "Cloudflare Workers", description: "Edge deployment" },
];

function AboutComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 font-bold text-3xl tracking-tight">About</h1>
      <p className="mb-8 text-muted-foreground">
        GitHub Stats Cards is an open-source tool for generating beautiful,
        customizable cards that showcase your GitHub statistics.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {techStack.map((tech) => (
              <div
                className="flex items-center justify-between"
                key={tech.name}
              >
                <span className="font-medium text-sm">{tech.name}</span>
                <span className="text-muted-foreground text-sm">
                  {tech.description}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Acknowledgments</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          <p>
            This project is inspired by{" "}
            <a
              className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              href="https://github.com/anuraghazra/github-readme-stats"
              rel="noopener noreferrer"
              target="_blank"
            >
              github-readme-stats
            </a>{" "}
            by Anurag Hazra. We extend our gratitude to the original author for
            creating such an amazing project.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Author</h2>
          <p className="text-muted-foreground text-sm">Built by Hayden</p>
        </div>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="https://github.com/haydenull/github-code-stats"
          rel="noopener noreferrer"
          target="_blank"
        >
          <HugeiconsIcon icon={Github01Icon} size={16} />
          View on GitHub
        </a>
      </div>
    </div>
  );
}
