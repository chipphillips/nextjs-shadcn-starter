"use client";

import { Iphone16Pro } from "@/components/ui/iphone-16-pro";

export function IPhone16ProDemo() {
  return (
    <div className="relative flex items-center justify-center">
      <Iphone16Pro
        src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1600&q=80"
        className="h-80 w-full"
      />
    </div>
  );
}