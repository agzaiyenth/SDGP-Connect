/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */


"use client";

import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "@/lib/blog-utils";

interface BlogFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilter({ activeCategory, onCategoryChange }: BlogFilterProps) {
  const categories = getAllCategories();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
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
