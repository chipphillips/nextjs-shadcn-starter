'use client';

import { cn } from "@/lib/utils";

interface GradientPulseProps {
  className?: string;
  children: React.ReactNode;
}

export function GradientPulse({ className, children }: GradientPulseProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/40 before:to-purple-500/40 before:animate-pulse",
      className
    )}>
      {children}
    </div>
  );
}