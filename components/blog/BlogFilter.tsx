// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.

"use client";

import { Badge } from "@/components/ui/badge";
import { blogCategories } from "@/data/blogData";

interface BlogFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilter({ activeCategory, onCategoryChange }: BlogFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {blogCategories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 transition-all duration-200 hover:scale-105"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
