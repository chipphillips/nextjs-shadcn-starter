import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const triggerButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/10 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:shadow-destructive/10 hover:-translate-y-0.5",
        outline: "border-2 border-input bg-background shadow-lg hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
        secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 hover:shadow-secondary/10 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TriggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof triggerButtonVariants> {
  asChild?: boolean;
}

const TriggerButton = React.forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(triggerButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
TriggerButton.displayName = "TriggerButton";

export { TriggerButton }