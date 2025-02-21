"use client";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80"
        className="absolute -right-20 -top-20 opacity-60"
        alt="Abstract background"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        className="absolute -right-20 -top-20 opacity-60"
        alt="Abstract pattern"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
        className="absolute -right-20 -top-20 opacity-60"
        alt="Colorful background"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80"
        className="absolute -right-20 -top-20 opacity-60"
        alt="Abstract art"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
        className="absolute -right-20 -top-20 opacity-60"
        alt="Geometric pattern"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function BentoGridDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-muted/50 to-muted p-10">
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}

export { BentoGridDemo };