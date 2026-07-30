import { useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMoveActions } from "@/lib/dnd/useMoveActions";

type MoveVideoDialogProps = {
  teamId: Id<"teams">;
  /** The video being moved, plus its current folder so we can exclude it. */
  video: {
    _id: Id<"videos">;
    title: string;
    projectId: Id<"projects">;
    versionNumber: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MoveVideoDialog({ teamId, video, open, onOpenChange }: MoveVideoDialogProps) {
  const folders = useQuery(api.projects.listForMove, open ? { teamId } : "skip");
  const { moveVideoTo } = useMoveActions();
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear a stale error when the dialog is reopened for another video.
  useEffect(() => {
    if (open) setError(null);
  }, [open, video?._id]);

  // A video can move into any folder except the one it already lives in.
  const destinations = useMemo(
    () => (folders ?? []).filter((folder) => folder._id !== video?.projectId),
    [folders, video?.projectId],
  );

  const handleMove = async (destProjectId: Id<"projects">) => {
    if (!video) return;
    setIsMoving(true);
    setError(null);
    const result = await moveVideoTo(video._id, destProjectId);
    setIsMoving(false);
    if (result.ok) {
      onOpenChange(false);
    } else {
      setError(result.error ?? "Failed to move video");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {video ? `Move all versions of "${video.title}"` : "Move video"}
          </DialogTitle>
          <DialogDescription>
            {video
              ? `Choose a folder for every version of this video, including the latest version (v${video.versionNumber}).`
              : "Choose which folder this video should live in."}
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
