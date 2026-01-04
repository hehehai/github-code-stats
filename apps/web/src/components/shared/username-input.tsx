import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { defaultSearchParams } from "@/lib/search-schema";
import { cn } from "@/lib/utils";
import { orpc } from "@/utils/orpc";

interface UsernameInputProps {
  autoRedirect?: boolean;
  className?: string;
  onValidUser?: (user: {
    login: string;
    name: string | null;
    avatarUrl: string;
  }) => void;
  placeholder?: string;
  size?: "default" | "lg";
}

function parseUsername(input: string): string {
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/github\.com\/([^/\s]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }
  return trimmed;
}

export function UsernameInput({
  autoRedirect = false,
  className,
  onValidUser,
  placeholder = "Enter GitHub username or profile URL",
  size = "default",
}: UsernameInputProps) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validateUserMutation = useMutation(orpc.validateUser.mutationOptions());

  const validateUsername = useCallback(
    async (username: string) => {
      if (!username) {
        setStatus("idle");
        setError(null);
        return;
      }

      setStatus("loading");
      setError(null);

      try {
        const result = await validateUserMutation.mutateAsync({ username });

        if (result.valid && result.user) {
          setStatus("valid");
          onValidUser?.(result.user);

          if (autoRedirect) {
            // Load last settings from localStorage or use defaults
            let searchParams: typeof defaultSearchParams;
            try {
              const lastSettings = localStorage.getItem(
                "github-stats-last-settings"
              );
              searchParams = lastSettings
                ? JSON.parse(lastSettings)
                : defaultSearchParams;
            } catch {
              // Use defaults if localStorage fails
              searchParams = defaultSearchParams;
            }

            navigate({
              to: "/stats/$username",
              params: { username: result.user.login },
              search: searchParams,
            });
          }
        } else {
          setStatus("invalid");
          setError(result.error ?? "User not found");
        }
      } catch (err) {
        setStatus("invalid");
        setError(err instanceof Error ? err.message : "Validation failed");
      }
    },
    [autoRedirect, navigate, onValidUser, validateUserMutation]
  );

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const username = parseUsername(input);

    if (!username) {
      setStatus("idle");
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(() => {
      validateUsername(username);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input, validateUsername]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && status !== "loading") {
      const username = parseUsername(input);
      if (username) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        validateUsername(username);
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        className={cn(
          "pr-10",
          size === "lg" && "h-12 text-base",
          status === "valid" &&
            "border-green-500 focus-visible:border-green-500",
          status === "invalid" &&
            "border-destructive focus-visible:border-destructive"
        )}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type="text"
        value={input}
      />
      <div className="absolute top-1/2 right-3 -translate-y-1/2">
        {status === "loading" && (
          <Spinner className="size-4 text-muted-foreground" />
        )}
        {status === "valid" && (
          <HugeiconsIcon
            className="text-green-500"
            icon={CheckmarkCircle02Icon}
            size={16}
          />
        )}
        {status === "invalid" && (
          <HugeiconsIcon
            className="text-destructive"
            icon={Cancel01Icon}
            size={16}
          />
        )}
      </div>
      {status === "invalid" && error && (
        <p className="mt-1.5 text-destructive text-xs">{error}</p>
      )}
    </div>
  );
}
