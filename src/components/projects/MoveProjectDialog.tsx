import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { collectDescendantIds } from "@/lib/folderTree";
import { Home } from "lucide-react";

type MoveProjectDialogProps = {
  teamId: Id<"teams">;
  project: { _id: Id<"projects">; name: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MoveProjectDialog({ teamId, project, open, onOpenChange }: MoveProjectDialogProps) {
  const folders = useQuery(api.projects.listForMove, open ? { teamId } : "skip");
  const move = useMutation(api.projects.move);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear a stale error when the dialog is reopened for another folder.
  useEffect(() => {
    if (open) setError(null);
  }, [open, project?._id]);

  // The folder being moved and all of its descendants are invalid destinations.
  const excludedIds = useMemo(() => {
    if (!project || !folders) return new Set<Id<"projects">>();
    return collectDescendantIds(project._id, folders);
  }, [folders, project]);

  const destinations = useMemo(
    () => (folders ?? []).filter((folder) => !excludedIds.has(folder._id)),
    [folders, excludedIds],
  );

  const handleMove = async (newParentId?: Id<"projects">) => {
    if (!project) return;
    setIsMoving(true);
    setError(null);
    try {
      await move({ projectId: project._id, newParentId });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to move folder");
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move {project ? `"${project.name}"` : "folder"}</DialogTitle>
          <DialogDescription>
            Choose where this folder and everything inside it should live.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="border-2 border-[#e50000] bg-[#feefef] px-3 py-2 text-sm font-bold text-[#e50000]">
            {error}
          </p>
        )}

        {folders === undefined ? (
          <p className="text-sm text-[#6b6b8a]">Loading folders...</p>
        ) : (
          <div className="max-h-80 divide-y-2 divide-[#272357] overflow-y-auto border-2 border-[#272357]">
            <button
              type="button"
              disabled={isMoving}
              className={cn(
                "flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-[#e9e9f2] disabled:opacity-50",
              )}
              onClick={() => handleMove(undefined)}
            >
              <Home className="h-4 w-4 text-[#6b6b8a]" />
              <span className="font-bold text-[#272357]">Top level</span>
            </button>
            {destinations.map((folder) => (
              <button
                key={folder._id}
                type="button"
                disabled={isMoving}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-[#e9e9f2] disabled:opacity-50"
                onClick={() => handleMove(folder._id)}
              >
                <p className="truncate font-bold text-[#272357]">{folder.path}</p>
              </button>
            ))}
            {destinations.length === 0 && (
              <p className="px-4 py-3 text-sm text-[#6b6b8a]">No other folders to move into.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
