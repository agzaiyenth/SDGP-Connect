// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

"use client";

import { useState } from "react";
import { BlogPost } from "@/data/blogData";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogContentProps {
  initialPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

/**
 * BlogContent - Client Component
 * 
 * This component handles all the interactive functionality for the blog:
 * - Search functionality
 * - Category filtering
 * - Dynamic post rendering
 * - State management
 * 
 * @param initialPosts - All blog posts passed from the server component
 * @param featuredPosts - Featured blog posts for highlighting
 */
export function BlogContent({ initialPosts, featuredPosts }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category
  const getPostsByCategory = (category: string): BlogPost[] => {
    if (category === "All") return initialPosts;
    return initialPosts.filter(post => post.category === category);
  };

  const filteredPosts = getPostsByCategory(activeCategory);
  
  // Filter posts based on search query
  const searchFilteredPosts = filteredPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate featured and regular posts for display
  const regularPosts = searchFilteredPosts.filter(post => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover insights, innovations, and stories that inspire change and drive sustainable development.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <BlogFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                Found {searchFilteredPosts.length} article{searchFilteredPosts.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Featured Posts Section */}
          {!searchQuery && activeCategory === "All" && featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts Section */}
          {searchFilteredPosts.length > 0 ? (
            <div>
              {!searchQuery && activeCategory === "All" && featuredPosts.length > 0 && (
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || activeCategory !== "All" ? searchFilteredPosts : regularPosts).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `No articles match your search for "${searchQuery}". Try different keywords or browse our categories.`
                    : `No articles found in the "${activeCategory}" category.`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View All Articles
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
