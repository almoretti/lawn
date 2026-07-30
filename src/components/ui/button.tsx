import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-bold tracking-wider whitespace-nowrap uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-2 border-[#272357] bg-[#272357] text-[#f5f5f9] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#5252e6] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]",
        primary:
          "border-2 border-[#272357] bg-[#5252e6] text-[#f5f5f9] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#4343cf] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]",
        destructive:
          "border-2 border-[#272357] bg-[#e50000] text-white shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#b91c1c] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]",
        outline:
          "border-2 border-[#272357] bg-transparent text-[#272357] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#272357] hover:text-[#f5f5f9] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]",
        secondary:
          "border-2 border-[#272357] bg-[#e9e9f2] text-[#272357] shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#dadae8] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]",
        ghost:
          "border-2 border-transparent text-[#272357] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:border-[#272357] hover:bg-[#272357] hover:text-[#f5f5f9] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]",
        link: "text-[#272357] underline underline-offset-4 hover:text-[#5252e6]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
