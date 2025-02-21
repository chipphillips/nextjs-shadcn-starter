'use client';

import { PackageIcon } from 'lucide-react';
import { categories } from '@/config/components.tsx';

export default function ComponentsPage() {
  return (
    <div className="space-y-12">
      <section className="border-b pb-8">
        <div className="mb-8 flex items-center gap-2">
          <PackageIcon className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Component Library</h2>
            <p className="text-muted-foreground">
              A collection of beautiful and reusable components
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Component Library
          </h1>
          <p className="text-lg text-muted-foreground">
            A curated collection of beautiful, reusable components for modern web applications.
          </p>
        </div>
        <div className="mt-12 space-y-16">
          {categories.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-lg text-muted-foreground">
                  {category.description}
                </p>
              </div>
              <div className="grid gap-8">
                {category.components.map((item) => (
                  <section key={item.id} id={item.id} className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="rounded-lg border bg-card p-6">
                      {item.component}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}