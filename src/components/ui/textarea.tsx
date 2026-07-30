import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full resize-none border-2 border-[#272357] bg-[#f5f5f9] px-3 py-2 font-mono text-sm text-[#272357] transition-all placeholder:text-[#6b6b8a] focus-visible:border-[#5252e6] focus-visible:shadow-[4px_4px_0px_0px_var(--shadow-accent)] focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
