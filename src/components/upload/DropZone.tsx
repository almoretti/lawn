"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export function DropZone({ onFilesSelected, disabled, className }: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("video/"),
      );

      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [disabled, onFilesSelected],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [disabled, onFilesSelected],
  );

  return (
    <div
      className={cn(
        "relative border-2 border-dashed p-12 text-center transition-all",
        isDragActive
          ? "border-[#5252e6] bg-[#5252e6]/5"
          : "border-[#272357] bg-[#f5f5f9] hover:border-[#6b6b8a]",
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleChange}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center border-2 border-[#272357] transition-colors",
            isDragActive ? "bg-[#5252e6] text-[#f5f5f9]" : "bg-[#e9e9f2] text-[#6b6b8a]",
          )}
        >
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <p className="font-bold text-[#272357]">
            {isDragActive ? "Drop to upload" : "Drop videos or click to upload"}
          </p>
          <p className="mt-1 text-sm text-[#6b6b8a]">MP4, MOV, WebM supported</p>
        </div>
      </div>
    </div>
  );
}
