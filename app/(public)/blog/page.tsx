/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SDGP Connect",
  description: "Discover insights, innovations, and stories that inspire change and drive sustainable development. Read our latest articles on technology, community, education, and more.",
  keywords: [
    "blog", "sustainable development", "innovation", "technology", "community", "education", "healthcare", "environment", "iit", "SDGP Connect", "articles", "insights", "stories", "global challenges", "social impact", "sustainability", "digital transformation", "AI", "healthcare innovation", "sustainable practices", "community-driven innovation", "education accessibility", "healthcare AI", "global development", "Informatics Institute of Technology", "IIT", "Sri Lanka", "SDGP Connect Blog", "SDGP Connect Articles", "SDGP Connect Insights", "SDGP Connect Stories", "Skill Verse", "SkillVerse", "Skill Verse Blog", "SkillVerse Articles", "SkillVerse Insights", "SkillVerse Stories", "Stem Link", "StemLink", "Stem Link Blog", "StemLink Articles", "StemLink Insights", "StemLink Stories", "SDGP Connect Sri Lanka", "SDGP Connect Community", "SDGP Connect Education", "SDGP Connect Healthcare", "SDGP Connect Environment", "APPIT Srilanka", "APPIT Sri Lanka Blog", "APPIT Sri Lanka Articles", "APPIT Sri Lanka Insights", "APPIT Sri Lanka Stories", "Computer Science", "Software Engineering", "Information Technology", "SDGP Connect Computer Science", "SDGP Connect Software Engineering", "SDGP Connect Information Technology"
  ].filter((keyword): keyword is string => keyword !== undefined),
  openGraph: {
    title: "Blog | SDGP Connect",
    description: "Discover insights, innovations, and stories that inspire change and drive sustainable development.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SDGP Connect Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | SDGP Connect",
    description: "Discover insights, innovations, and stories that inspire change and drive sustainable development.",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"],
  },
};


import { BlogContent } from "@/components/blog/BlogContent";

export default async function BlogPage() {
  // The BlogContent component now handles all data fetching via hooks
  // No need to fetch data here since we're using client-side hooks for real-time updates

  return (
    <div className="min-h-screen bg-background">
      <BlogContent />
    </div>
  );
}
