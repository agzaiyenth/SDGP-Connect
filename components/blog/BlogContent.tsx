// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

"use client";

import { useState } from "react";
import { BlogPost } from "@/data/blogData";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FeaturedBlogCard } from "@/components/blog/FeaturedBlogCard";
import Link from "next/link";

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
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
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
            </div>          )}          {/* Featured Posts Section */}
          {!searchQuery && activeCategory === "All" && featuredPosts.length > 0 && (
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Side - Title Section */}
                <div className="flex flex-col justify-center lg:pr-12 mb-8 lg:mb-0">
                  <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white text-left">
                    AI Frontiers
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 text-left">
                    Discover breakthroughs in AI and TensorFlow applications.
                  </p>
                  <Link href="/blog/create" className="inline-flex items-center text-primary font-semibold hover:underline">
                  <button className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold text-base shadow text-left w-fit">
                    Add your Articles
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                    </Link>
                </div>                {/* Right Side - Featured Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {featuredPosts.slice(0, 2).map((post) => (
                    <FeaturedBlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Section */}
          {searchFilteredPosts.length > 0 ? (
            <div>
              {!searchQuery && activeCategory === "All" && featuredPosts.length > 0 && (
                <h2 className="text-5xl font-extrabold mb-8 text-center  mb-6 leading-tight">Latest Articles</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {(searchQuery || activeCategory !== "All" ? searchFilteredPosts : regularPosts).map((post) => (
                  <div className="h-full  flex"><BlogCard key={post.id} post={post} className="flex-1 h-full" /></div>
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
