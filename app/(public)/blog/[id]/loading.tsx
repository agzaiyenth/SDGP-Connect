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

      {/* Article Header Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="h-12 bg-muted rounded-lg animate-pulse mb-6"></div>
            <div className="h-12 bg-muted rounded-lg animate-pulse mb-6 w-3/4"></div>

            {/* Excerpt */}
            <div className="h-6 bg-muted rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-muted rounded animate-pulse mb-8 w-5/6"></div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Skeleton */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Article Content Skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`h-4 bg-muted rounded animate-pulse mb-4 ${
                Math.random() > 0.7 ? 'w-3/4' : 'w-full'
              }`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles Skeleton */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl border p-6 shadow-sm">
                  <div className="aspect-video bg-muted rounded-lg animate-pulse mb-4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-muted rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-muted rounded animate-pulse mb-4 w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
