import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/utils/orpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type CardType = "stats" | "topLangs" | "pin";

function parseUsername(input: string): string {
  const trimmed = input.trim();
  // Handle GitHub URL patterns
  const urlMatch = trimmed.match(/github\.com\/([^/\s]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  // Return as-is if it's just a username
  return trimmed;
}

function HomeComponent() {
  const [input, setInput] = useState("");
  const [cardType, setCardType] = useState<CardType>("stats");
  const [repo, setRepo] = useState("");
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    const username = parseUsername(input);
    if (!username) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setIsLoading(true);
    setSvgContent(null);

    try {
      let response: { headers: Record<string, string>; body: string };

      switch (cardType) {
        case "stats":
          response = await client.stats({ username });
          break;
        case "topLangs":
          response = await client.topLangs({ username });
          break;
        case "pin":
          if (!repo.trim()) {
            toast.error("Please enter a repository name");
            setIsLoading(false);
            return;
          }
          response = await client.pin({ username, repo: repo.trim() });
          break;
        default:
          return;
      }

      setSvgContent(response.body);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate card";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const isGenerateDisabled =
    !input.trim() || (cardType === "pin" && !repo.trim()) || isLoading;

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="GitHub username or profile URL"
            value={input}
          />
          <Button disabled={isGenerateDisabled} onClick={handleGenerate}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>

        <Tabs
          onValueChange={(value) => setCardType(value as CardType)}
          value={cardType}
        >
          <TabsList>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="topLangs">Top Languages</TabsTrigger>
            <TabsTrigger value="pin">Repo Pin</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <p className="text-muted-foreground text-sm">
              Display GitHub statistics including stars, commits, PRs, and rank.
            </p>
          </TabsContent>

          <TabsContent value="topLangs">
            <p className="text-muted-foreground text-sm">
              Show the most used programming languages across repositories.
            </p>
          </TabsContent>

          <TabsContent value="pin">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Showcase a specific repository with its details.
              </p>
              <Input
                disabled={isLoading}
                onChange={(e) => setRepo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Repository name"
                value={repo}
              />
            </div>
          </TabsContent>
        </Tabs>

        {isLoading && (
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        )}

        {svgContent && !isLoading && (
          <Card>
            <CardContent className="p-4">
              <div
                className="w-full [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
