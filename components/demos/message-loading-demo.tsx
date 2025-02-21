"use client";

import { MessageLoading } from "@/components/ui/message-loading";

function MessageLoadingDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-muted/50 to-muted p-10">
      <div className="flex items-center justify-center gap-8">
        <MessageLoading />
      </div>
    </div>
  );
}

export { MessageLoadingDemo };