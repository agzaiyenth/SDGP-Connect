// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostById, getRecentPosts } from "@/data/blogData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostById(params.id);
  
  if (!post) {
    return {
      title: "Blog Post Not Found | SDGP Connect",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | SDGP Connect Blog`,
    description: post.excerpt,
    keywords: [...post.tags, "SDGP Connect", "blog", post.category],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostById(params.id);
  
  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts().filter(p => p.id !== post.id);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate dynamic content for the blog post
  const generateContent = (post: any) => {
    return `
      <p class="text-lg leading-relaxed mb-6">
        ${post.content}
      </p>
      
      <p class="mb-6">
        In today's rapidly evolving world, the intersection of technology and sustainable development has become more crucial than ever. This article explores the innovative approaches and groundbreaking solutions that are shaping our future.
      </p>
      
      <h2 class="text-2xl font-bold mb-4 text-foreground">Key Insights</h2>
      <p class="mb-6">
        The developments in this field continue to surprise and inspire. From artificial intelligence to renewable energy, from community-driven initiatives to global partnerships, we're witnessing unprecedented collaboration and innovation.
      </p>
      
      <blockquote class="border-l-4 border-primary pl-6 py-2 mb-6 bg-muted/50 rounded-r-lg">
        <p class="text-lg italic text-muted-foreground">
          "Innovation is not just about technology; it's about creating solutions that work for everyone, everywhere."
        </p>
      </blockquote>
      
      <h2 class="text-2xl font-bold mb-4 text-foreground">Looking Forward</h2>
      <p class="mb-6">
        As we continue to navigate the challenges of the 21st century, it's clear that collaborative innovation and sustainable practices will be at the heart of meaningful progress. The examples and insights shared here represent just the beginning of what's possible when we combine human creativity with technological advancement.
      </p>
      
      <p class="mb-6">
        We encourage readers to engage with these ideas, share their own experiences, and contribute to the ongoing conversation about building a more sustainable and innovative future for all.
      </p>
    `;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <Badge className="bg-primary text-primary-foreground">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video overflow-hidden rounded-xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={675}
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-blockquote:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: generateContent(post) }}
            />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.slice(0, 3).map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
