// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client";

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchHeaderProps {
  toggleFilters?: () => void;
  defaultTitle?: string;
  onSearch: (value: string) => void;
}

export default function SearchHeader({
  toggleFilters,
  defaultTitle = "",
  onSearch
}: SearchHeaderProps) {
  const [value, setValue] = useState(defaultTitle);

  // keep local state in sync if defaultTitle ever changes
  useEffect(() => {
    setValue(defaultTitle);
  }, [defaultTitle]);

  // debounce: wait 300ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(handler);
  }, [value, onSearch]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title..."
            className="pl-10"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="md:hidden flex-shrink-0"
          onClick={toggleFilters}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
