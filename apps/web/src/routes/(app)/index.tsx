import { ChartIcon, CodeIcon, PinIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";

import { UsernameInput } from "@/components/shared/username-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(app)/")({
  component: HomeComponent,
});

const features = [
  {
    icon: ChartIcon,
    title: "GitHub Stats",
    description:
      "Display your GitHub statistics including stars, commits, PRs, issues, and overall rank.",
  },
  {
    icon: CodeIcon,
    title: "Top Languages",
    description:
      "Showcase the programming languages you use most across your repositories.",
  },
  {
    icon: PinIcon,
    title: "Repo Pin",
    description:
      "Pin and highlight your favorite repositories with beautiful cards.",
  },
];

function HomeComponent() {
  return (
    <div className="container mx-auto px-4">
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl">
          GitHub Stats Cards
        </h1>
        <p className="mb-8 max-w-xl text-lg text-muted-foreground">
          Generate beautiful, customizable cards to showcase your GitHub
          statistics. Perfect for your README or portfolio.
        </p>
        <div className="w-full max-w-md">
          <UsernameInput
            autoRedirect
            placeholder="Enter GitHub username to get started"
            size="lg"
          />
        </div>
      </section>

      <section className="pb-24">
        <h2 className="mb-8 text-center font-semibold text-2xl">Features</h2>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <HugeiconsIcon
                    className="text-foreground"
                    icon={feature.icon}
                    size={20}
                  />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
