"use client";

// Card preview for static images/GIFs: unlike videos there is no Mux
// thumbnail, so we fetch a short-lived signed URL for the bucket original
// and render it directly. URLs are cached per video for a few minutes so a
// grid of cards doesn't re-sign on every mount.
import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

const CACHE_TTL_MS = 5 * 60 * 1000;
const urlCache = new Map<string, { url: string; fetchedAt: number }>();

export function ImageThumbnail({
  videoId,
  alt,
  className,
}: {
  videoId: Id<"videos">;
  alt: string;
  className?: string;
}) {
  const getOriginalPlaybackUrl = useAction(api.videoActions.getOriginalPlaybackUrl);
  const cached = urlCache.get(videoId);
  const [url, setUrl] = useState<string | null>(
    cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS ? cached.url : null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (url) return;
    let cancelled = false;
    getOriginalPlaybackUrl({ videoId })
      .then((result) => {
        if (cancelled) return;
        urlCache.set(videoId, { url: result.url, fetchedAt: Date.now() });
        setUrl(result.url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [videoId, url, getOriginalPlaybackUrl]);

  if (!url || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon className="h-10 w-10 text-[#6b6b8a]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      draggable={false}
      loading="lazy"
      decoding="async"
      className={className ?? "h-full w-full object-cover"}
      onError={() => {
        urlCache.delete(videoId);
        setFailed(true);
      }}
    />
  );
}

export function isImageContent(contentType?: string | null): boolean {
  return Boolean(contentType?.startsWith("image/"));
}

export function imageKindLabel(contentType?: string | null): string {
  return contentType === "image/gif" ? "GIF" : "IMG";
}
