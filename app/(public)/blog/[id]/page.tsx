// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  InstagramIcon,
  XIcon,
  SunMediumIcon,
  BluetoothSearchingIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useGetPostById } from "@/hooks/blogs/useGetPostById";
import { useGetRecentPosts } from "@/hooks/blogs/useGetRecentPosts";
import { getDisplayFromEnum, formatDateForDisplay, calculateReadTime } from "@/lib/blog-utils";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { post, isLoading, error } = useGetPostById(params.id);
  const { posts: recentPosts } = useGetRecentPosts({ limit: 3 });
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = formatDateForDisplay(post.publishedAt);
  const readTime = calculateReadTime(post.content);
  const categoryDisplay = getDisplayFromEnum(post.category);

  return (
    <section className="py-16 flex justify-center items-center">
      <div className="container ">
        <div className="relative mb-12 h-[600px] overflow-hidden">
          <Image            src={post.imageUrl || '/placeholder.svg'}
            alt="Blog post cover image"
            width={1200}
            height={600}
            className="h-full w-full rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-gradient-to-r from-black/70 to-black/30 p-8 text-white">
            <h1 className="mb-4 text-5xl font-bold leading-tight">{post.title}</h1>
            <div className="mb-4 flex items-center  space-x-4">              <Avatar className="size-12 ring-2 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage src={post.author?.avatarUrl || '/default-avatar.png'} alt={post.author?.name || 'Author'} />
                <AvatarFallback>{post.author?.name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div className="">
                <p className="text-xl font-semibold">{post.author?.name || 'Anonymous'}</p>
                <p className="text-sm opacity-75">Contributor</p>
              </div>
            </div>
            <div className="mb-4 flex items-center text-sm">
              <CalendarIcon className="mr-2 size-5" />              <time dateTime={post.publishedAt.toString()} className="mr-4">
                {formattedDate}
              </time>
            </div>            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-background/10 text-white hover:bg-background/20">
                {categoryDisplay}
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 lg:col-span-9">
            <article
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content && post.content.trim() !== '' ? `
                <h2>The Evolution of Frameworks</h2>
                <h3>Chapter 1: The Web Development Renaissance</h3>
                <p>The landscape of web development has undergone a remarkable transformation in recent years. What started as simple HTML pages has evolved into complex, interactive applications that push the boundaries of what's possible in the browser. Modern frameworks have become the cornerstone of this evolution, enabling developers to build sophisticated applications with unprecedented efficiency.</p>
                <p>Among these innovations, <strong>Next.js</strong> has emerged as a game-changing framework, revolutionizing how we approach React applications. Its server-side rendering capabilities and intuitive routing system have set new standards for performance and developer experience.</p>
                <h3>Chapter 2: The Rise of Component-Based Architecture</h3>
                <p>Component-based architecture has fundamentally changed how we structure web applications. By breaking down interfaces into reusable, modular components, developers can now build more maintainable and scalable applications. This approach has not only improved code organization but has also fostered better collaboration between design and development teams.</p>
                <h3>Chapter 3: The Performance Revolution</h3>
                <p>Performance optimization has become a critical focus in modern web development. With users expecting near-instant load times and smooth interactions, developers have embraced techniques like code splitting, lazy loading, and advanced caching strategies. These optimizations ensure that applications remain fast and responsive, even as they grow in complexity.</p>
                <h3>Chapter 4: Emerging Trends and Technologies</h3>
                <p>The web development landscape continues to evolve at a rapid pace. New tools and technologies emerge regularly, each promising to solve complex problems in innovative ways. From WebAssembly to Edge Computing, these advancements are shaping the future of how we build and deploy web applications.</p>
                <blockquote><p>"The most exciting aspect of modern web development is how it empowers developers to focus on creating exceptional user experiences rather than wrestling with technical limitations."</p></blockquote>
                <p>As we look to the future, it's clear that web development will continue to evolve. The frameworks and tools we use today are just the beginning of what's possible. With each new innovation, we move closer to a web that's more powerful, accessible, and user-friendly than ever before.</p>
                <table>
                  <thead>
                    <tr><th>King's Treasury</th><th>People's happiness</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Empty</td><td>Overflowing</td></tr>
                    <tr><td>Modest</td><td>Satisfied</td></tr>
                    <tr><td>Full</td><td>Ecstatic</td></tr>
                  </tbody>
                </table>
                <p>As the designers continued to push the boundaries of their craft, they became revered throughout the kingdom for their innovative approach and the seamless user experiences they created. Their success inspired other teams to follow in their footsteps, and soon the entire digital realm was abuzz with the transformative power of Tailwind CSS.</p>
              ` : `
                <h2>The Evolution of Frameworks</h2>
                <h3>Chapter 1: The Web Development Renaissance</h3>
                <p>The landscape of web development has undergone a remarkable transformation in recent years. What started as simple HTML pages has evolved into complex, interactive applications that push the boundaries of what's possible in the browser. Modern frameworks have become the cornerstone of this evolution, enabling developers to build sophisticated applications with unprecedented efficiency.</p>
                <p>Among these innovations, <strong>Next.js</strong> has emerged as a game-changing framework, revolutionizing how we approach React applications. Its server-side rendering capabilities and intuitive routing system have set new standards for performance and developer experience.</p>
                <h3>Chapter 2: The Rise of Component-Based Architecture</h3>
                <p>Component-based architecture has fundamentally changed how we structure web applications. By breaking down interfaces into reusable, modular components, developers can now build more maintainable and scalable applications. This approach has not only improved code organization but has also fostered better collaboration between design and development teams.</p>
                <h3>Chapter 3: The Performance Revolution</h3>
                <p>Performance optimization has become a critical focus in modern web development. With users expecting near-instant load times and smooth interactions, developers have embraced techniques like code splitting, lazy loading, and advanced caching strategies. These optimizations ensure that applications remain fast and responsive, even as they grow in complexity.</p>
                <h3>Chapter 4: Emerging Trends and Technologies</h3>
                <p>The web development landscape continues to evolve at a rapid pace. New tools and technologies emerge regularly, each promising to solve complex problems in innovative ways. From WebAssembly to Edge Computing, these advancements are shaping the future of how we build and deploy web applications.</p>
                <blockquote><p>"The most exciting aspect of modern web development is how it empowers developers to focus on creating exceptional user experiences rather than wrestling with technical limitations."</p></blockquote>
                <p>As we look to the future, it's clear that web development will continue to evolve. The frameworks and tools we use today are just the beginning of what's possible. With each new innovation, we move closer to a web that's more powerful, accessible, and user-friendly than ever before.</p>
                <table>
                  <thead>
                    <tr><th>King's Treasury</th><th>People's happiness</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Empty</td><td>Overflowing</td></tr>
                    <tr><td>Modest</td><td>Satisfied</td></tr>
                    <tr><td>Full</td><td>Ecstatic</td></tr>
                  </tbody>
                </table>
                <p>As the designers continued to push the boundaries of their craft, they became revered throughout the kingdom for their innovative approach and the seamless user experiences they created. Their success inspired other teams to follow in their footsteps, and soon the entire digital realm was abuzz with the transformative power of Tailwind CSS.</p>
              ` }}
            />
          </div>
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Share this article</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <TwitterIcon className="size-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <FacebookIcon className="size-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <LinkedinIcon className="size-4" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                      {copySuccess ? <CheckIcon className="size-4 text-green-500" /> : <CopyIcon className="size-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>About the Author</CardTitle>
                </CardHeader>
                <CardContent>                  <div className="flex items-center space-x-4">
                    <Avatar className="size-10 ring-2 ring-primary ring-offset-2 ring-offset-background">
                      <AvatarImage src={post.author?.avatarUrl || '/default-avatar.png'} alt={post.author?.name || 'Author'} />
                      <AvatarFallback>{post.author?.name?.[0] || 'A'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author?.name || 'Anonymous'}</p>
                      <p className="text-sm text-muted-foreground">
                        Contributor
                      </p>
                    </div>
                  </div>                  <Separator className="my-4" />
                  <ul className="space-y-2">
                    {post.author?.instagram && (
                      <li className="flex items-center space-x-2">
                        <InstagramIcon className="size-4" />
                        <Link
                          href={post.author.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          Instagram
                        </Link>
                      </li>
                    )}
                    {post.author?.facebook && (
                      <li className="flex items-center space-x-2">
                        <FacebookIcon className="size-4" />
                        <Link
                          href={post.author.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          Facebook
                        </Link>
                      </li>
                    )}
                    {post.author?.twitter && (
                      <li className="flex items-center space-x-2">
                        <XIcon className="size-4" />
                        <Link
                          href={post.author.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          X
                        </Link>
                      </li>
                    )}
                    {post.author?.medium && (
                      <li className="flex items-center space-x-2">
                        <SunMediumIcon className="size-4" />
                        <Link
                          href={post.author.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          Medium
                        </Link>
                      </li>
                    )}
                    {post.author?.linkedin && (
                      <li className="flex items-center space-x-2">
                        <LinkedinIcon className="size-4" />
                        <Link
                          href={post.author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          LinkedIn
                        </Link>
                      </li>
                    )}
                    {post.author?.website && (
                      <li className="flex items-center space-x-2">
                        <BluetoothSearchingIcon className="size-4" />
                        <Link
                          href={post.author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          Website
                        </Link>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Related Articles</CardTitle>
                </CardHeader>
                <CardContent>                  <ul className="space-y-2">
                    {recentPosts.filter((relatedPost) => relatedPost.id !== post.id).slice(0, 5).map((relatedPost) => (
                      <li key={relatedPost.id}>
                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="text-sm hover:underline"
                        >
                          {relatedPost.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
