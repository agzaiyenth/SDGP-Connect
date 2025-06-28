// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </div>
      </section>

      {/* Featured Image Skeleton */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative mb-12 h-[600px] overflow-hidden">
              <div className="h-full w-full rounded-lg bg-muted animate-pulse"></div>
              <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-gradient-to-r from-black/70 to-black/30 p-8">
                <div className="h-12 bg-muted rounded-lg animate-pulse mb-6 w-2/3"></div>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="size-12 rounded-full bg-muted animate-pulse"></div>
                  <div>
                    <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="mb-4 flex items-center text-sm space-x-4">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content and Side Panel Skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            {/* Main Article Skeleton */}
            <div className="md:col-span-8 lg:col-span-9">
              <div className="max-w-3xl mx-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`h-4 bg-muted rounded animate-pulse mb-4 ${
                    Math.random() > 0.7 ? 'w-3/4' : 'w-full'
                  }`}></div>
                ))}
              </div>
            </div>
            {/* Side Panel Skeleton */}
            <aside className="md:col-span-4 lg:col-span-3">
              <div className="sticky top-20 space-y-6">
                {/* Share Card Skeleton */}
                <div className="bg-card rounded-xl border p-6 shadow-sm">
                  <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse"></div>
                  <div className="flex space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
                {/* Author Card Skeleton */}
                <div className="bg-card rounded-xl border p-6 shadow-sm">
                  <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse"></div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="size-10 rounded-full bg-muted animate-pulse"></div>
                    <div>
                      <div className="h-4 w-24 bg-muted rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-40 bg-muted rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                </div>
                {/* Related Articles Card Skeleton */}
                <div className="bg-card rounded-xl border p-6 shadow-sm">
                  <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse"></div>
                  <ul className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <li key={i}>
                        <div className="h-4 w-40 bg-muted rounded animate-pulse mb-2"></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
