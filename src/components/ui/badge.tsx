import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-2 px-2 py-0.5 text-xs font-bold tracking-wider uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#272357] bg-[#272357] text-[#f5f5f9]",
        secondary: "border-[#272357] bg-[#e9e9f2] text-[#272357]",
        destructive: "border-[#272357] bg-[#e50000] text-white",
        outline: "border-[#272357] bg-transparent text-[#272357]",
        success: "border-[#272357] bg-[#5252e6] text-[#f5f5f9]",
        warning: "border-[#272357] bg-[#d97f14] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
