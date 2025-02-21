"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-muted/50 to-muted p-10">
      <div className="flex justify-center items-start flex-col px-4">
        <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
          Visit{" "}
          <LinkPreview
            url="https://ui.aceternity.com"
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
          >
            Aceternity UI
          </LinkPreview>{" "}
          for amazing Tailwind and Framer Motion components.
        </p>

        <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left">
          Check out{" "}
          <LinkPreview
            url="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
            imageSrc="https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=640&q=80"
            isStatic
            className="font-bold"
          >
            this image
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview
            url="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            imageSrc="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=640&q=80"
            isStatic
            className="font-bold"
          >
            this one
          </LinkPreview>{" "}
          from Unsplash
        </p>
      </div>
    </div>
  );
}