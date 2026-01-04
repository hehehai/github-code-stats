import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserInfoProps {
  avatarUrl?: string;
  bio?: string | null;
  isLoading?: boolean;
  name?: string | null;
  username: string;
}

export function UserInfo({
  avatarUrl,
  bio,
  isLoading,
  name,
  username,
}: UserInfoProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-16">
        <AvatarImage alt={username} src={avatarUrl} />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold text-xl">{name ?? username}</h2>
        <p className="text-muted-foreground text-sm">@{username}</p>
        {bio && (
          <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
