"use client";

import { Safari } from "@/components/ui/safari";

export function SafariDemo() {
  return (
    <div className="relative">
      <Safari
        url="component-library.dev"
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=700&q=80"
        className="w-full"
      />
    </div>
  );
}