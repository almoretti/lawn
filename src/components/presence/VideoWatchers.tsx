import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { VideoWatcher } from "@/lib/useVideoPresence";

function initials(name: string) {
  const cleaned = name.trim();
  if (!cleaned) return "??";

  const pieces = cleaned.split(/\s+/).slice(0, 2);
  return pieces
    .map((piece) => piece[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export function VideoWatchers({
  watchers,
  className,
}: {
  watchers: VideoWatcher[];
  className?: string;
}) {
  if (watchers.length === 0) return null;

  const visible = watchers.slice(0, 5);
  const overflow = Math.max(0, watchers.length - visible.length);

  return (
    <div
      className={cn("inline-flex items-center", className)}
      title={watchers.map((w) => w.displayName).join(", ")}
    >
      <div className="flex -space-x-1.5">
        {visible.map((watcher) => (
          <Avatar key={watcher.userId} className="h-5 w-5 border-2 border-[#f5f5f9] ring-0">
            {watcher.avatarUrl ? (
              <AvatarImage src={watcher.avatarUrl} alt={watcher.displayName} />
            ) : null}
            <AvatarFallback className="bg-[#e9e9f2] text-[8px] leading-none font-bold text-[#272357]">
              {initials(watcher.displayName)}
            </AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#f5f5f9] bg-[#e9e9f2] px-1 text-[8px] font-bold text-[#6b6b8a]">
            +{overflow}
          </span>
        )}
      </div>
    </div>
  );
}
