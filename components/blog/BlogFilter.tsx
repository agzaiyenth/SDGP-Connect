// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

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
