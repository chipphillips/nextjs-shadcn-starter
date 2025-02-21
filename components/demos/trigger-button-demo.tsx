"use client";

import { TriggerButton } from "@/components/ui/trigger-button";
import { Sparkles } from "lucide-react";

function TriggerButtonDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-muted/50 to-muted p-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <TriggerButton variant="default">
          Default
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
        <TriggerButton variant="destructive">
          Destructive
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
        <TriggerButton variant="outline">
          Outline
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
        <TriggerButton variant="secondary">
          Secondary
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
        <TriggerButton variant="ghost">
          Ghost
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
        <TriggerButton variant="link">
          Link
          <Sparkles className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </TriggerButton>
      </div>
    </div>
  );
}

export { TriggerButtonDemo }