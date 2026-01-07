import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
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
            let searchParams: typeof defaultSearchParams;
            try {
              const lastSettings = localStorage.getItem(
                "github-stats-last-settings"
              );
              searchParams = lastSettings
                ? JSON.parse(lastSettings)
                : defaultSearchParams;
            } catch {
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

  const handleSubmit = useCallback(() => {
    const username = parseUsername(input);
    if (username && status !== "loading") {
      validateUsername(username);
    }
  }, [input, status, validateUsername]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={className}>
      <InputGroup
        className={cn(
          size === "lg" && "h-11",
          status === "valid" && "border-green-500",
          status === "invalid" && "border-destructive"
        )}
      >
        <InputGroupInput
          className={size === "lg" ? "text-base" : undefined}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          value={input}
        />
        <InputGroupAddon align="inline-end">
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
          <InputGroupButton
            disabled={!input.trim() || status === "loading"}
            onClick={handleSubmit}
          >
            {status === "loading" ? <Spinner className="size-3.5" /> : "Search"}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {status === "invalid" && error && (
        <p className="mt-1.5 text-destructive text-xs">{error}</p>
      )}
    </div>
  );
}
