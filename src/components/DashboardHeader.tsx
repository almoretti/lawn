import { Link } from "@tanstack/react-router";
import { useAppUser } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeToggle";
import React from "react";
import { useConvex } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRoutePrewarmIntent } from "@/lib/useRoutePrewarmIntent";
import { useFolderDropTarget } from "@/lib/dnd/useFolderDropTarget";
import type { FolderNode } from "@/lib/folderTree";
import type { DragPayload } from "@/lib/dnd/payload";
import { prewarmDashboardIndex } from "../../app/routes/dashboard/-index.data";

function ThemeToggleButton() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center text-[#6b6b8a] transition-colors hover:bg-[#e9e9f2] hover:text-[#272357]"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode (⌘⇧L)`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/** Makes a breadcrumb segment a drop target so items can be dragged "up" the
 * tree onto an ancestor (or the team root for top level), file-manager style. */
export type BreadcrumbDrop = {
  teamId: Id<"teams">;
  /** Destination folder; omit for "top level" (folders only). */
  targetProjectId?: Id<"projects">;
  /** Team folder list, for the folder-into-descendant guard. */
  folders?: readonly FolderNode[];
  disabled?: boolean;
  onDropMove: (payload: DragPayload) => void;
};

export type PathSegment = {
  label: React.ReactNode;
  href?: string;
  prewarmIntentHandlers?: ReturnType<typeof useRoutePrewarmIntent>;
  drop?: BreadcrumbDrop;
};

function BreadcrumbSegment({
  path,
  isIntermediate,
}: {
  path: PathSegment;
  isIntermediate: boolean;
}) {
  const { ref, isDraggedOver, canDropHere } = useFolderDropTarget<HTMLDivElement>({
    disabled: !path.drop || path.drop.disabled,
    targetProjectId: path.drop?.targetProjectId,
    teamId: path.drop?.teamId as Id<"teams">,
    folders: path.drop?.folders,
    onMove: (payload) => path.drop?.onDropMove(payload),
  });

  return (
    <div
      ref={ref}
      className={cn(
        `${isIntermediate ? "hidden sm:flex" : "flex"} min-w-0 flex-shrink items-center`,
        isDraggedOver && canDropHere && "bg-[#5252e6]/10 text-[#5252e6]",
        isDraggedOver && !canDropHere && "bg-[#e50000]/10",
      )}
    >
      <span className="mr-2 flex-shrink-0 text-[#6b6b8a]">/</span>
      {path.href ? (
        <Link
          to={path.href}
          preload="intent"
          className={cn(
            "mr-2 truncate transition-colors hover:text-[#5252e6]",
            isDraggedOver && canDropHere && "text-[#5252e6] underline",
          )}
          {...path.prewarmIntentHandlers}
        >
          {path.label}
        </Link>
      ) : (
        <div className="mr-2 flex min-w-0 items-center gap-3 py-2">{path.label}</div>
      )}
    </div>
  );
}

export function DashboardHeader({
  children,
  paths = [],
}: {
  children?: React.ReactNode;
  paths?: PathSegment[];
}) {
  const convex = useConvex();
  const prewarmHomeIntentHandlers = useRoutePrewarmIntent(() => prewarmDashboardIndex(convex));

  return (
    <header className="grid flex-shrink-0 grid-cols-[1fr_auto] items-center border-b-2 border-[#272357] bg-[#f5f5f9] px-4 sm:grid-cols-[auto_1fr_auto] sm:px-6">
      {/* Breadcrumb */}
      <div className="flex min-h-11 min-w-0 items-center text-xl font-black tracking-tighter text-[#272357] sm:min-h-14">
        <Link
          to="/dashboard"
          preload="intent"
          className="mr-2 flex-shrink-0 transition-colors hover:text-[#5252e6]"
          {...prewarmHomeIntentHandlers}
        >
          lawn.
        </Link>
        {paths.map((path, index) => {
          const isIntermediate = paths.length >= 2 && index < paths.length - 1;
          return <BreadcrumbSegment key={index} path={path} isIntermediate={isIntermediate} />;
        })}
      </div>

      {/* User controls — pinned top-right */}
      <div className="col-start-2 row-start-1 flex h-8 items-center gap-4 border-l-2 border-[#272357]/10 pl-4 sm:col-start-3">
        <ThemeToggleButton />
        <UserMenu />
      </div>

      {/* Children — second row on mobile, middle column on desktop */}
      {children && (
        <div className="scrollbar-hidden col-span-full flex min-w-0 items-center gap-2 overflow-x-auto pb-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:h-14 sm:gap-3 sm:pb-0 sm:pl-4 [&>*]:shrink-0 sm:[&>*:first-child]:ml-auto">
          {children}
        </div>
      )}
    </header>
  );
}

function UserMenu() {
  const { user } = useAppUser();
  if (!user) return null;

  const initials =
    user.name
      .split(/\s+/)
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="User menu"
          className="flex h-8 w-8 items-center justify-center border-2 border-[#272357] bg-[#e9e9f2] font-mono text-xs font-bold text-[#272357] transition-colors hover:bg-[#272357] hover:text-[#f5f5f9]"
        >
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-none border-2 border-[#272357] bg-[#f5f5f9]"
      >
        <DropdownMenuLabel className="font-mono">
          <div className="font-bold text-[#272357]">{user.name}</div>
          {user.email && <div className="text-xs font-normal text-[#6b6b8a]">{user.email}</div>}
        </DropdownMenuLabel>
        {!import.meta.env.DEV && (
          <>
            <DropdownMenuSeparator className="bg-[#272357]" />
            <DropdownMenuItem asChild className="rounded-none font-mono font-bold">
              {/* Cloudflare Access session logout */}
              <a href="/cdn-cgi/access/logout">Sign out</a>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
