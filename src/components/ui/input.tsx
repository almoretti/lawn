import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-2 border-[#272357] bg-[#f5f5f9] px-3 py-2 font-mono text-sm text-[#272357] transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6b6b8a] focus-visible:border-[#5252e6] focus-visible:shadow-[4px_4px_0px_0px_var(--shadow-accent)] focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
