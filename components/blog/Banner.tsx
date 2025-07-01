"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Banner3Props {
  badgeText?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
}

function Banner3({
  badgeText = "New",
  message = "",
  linkText = "Learn more",
  linkHref = "#",
}: Banner3Props) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pr-10 sm:pr-12">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <Badge className="bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black px-2 py-1 text-xs font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200 shrink-0">
            {badgeText}
          </Badge>
          <span className="text-gray-800 dark:text-gray-200 font-medium text-xs sm:text-sm leading-relaxed">{message}</span>
        </div>
        <a
          href={linkHref}
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 hover:underline transition-colors duration-200 group w-fit shrink-0 mt-1 sm:mt-0"
        >
          {linkText}
          <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 text-black dark:text-white group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 shrink-0 bg-white/90 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm group h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-90 transition-transform duration-200" />
      </Button>
    </div>
  );
}

export { Banner3 };