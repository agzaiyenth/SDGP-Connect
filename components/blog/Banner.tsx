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
    <div className="relative inline-flex flex-row items-center justify-between gap-2 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-800/50 px-3 py-2 sm:px-4 sm:py-3 md:py-4 w-fit max-w-[calc(100vw-2rem)] sm:max-w-none transition-all duration-300 hover:from-black/95 hover:via-gray-900/95 hover:to-black/95">
      <div className="flex flex-row items-center gap-2 sm:gap-4 pr-8 sm:pr-12 min-w-0 flex-1">
        <Badge className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium bg-white/20 text-white border border-white/30 shrink-0">
          {badgeText}
        </Badge>
        <span className="text-white/90 font-medium text-xs sm:text-sm leading-tight truncate min-w-0 flex-1">{message}</span>
        {linkHref && linkText && (
          <a
            href={linkHref}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 group shrink-0 bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded whitespace-nowrap"
          >
            {linkText}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-300 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        )}
      </div>
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1 sm:right-2 sm:top-2 p-0.5 sm:p-1.5 rounded-full transition-all duration-200 bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50 h-4 w-4 sm:h-auto sm:w-auto"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
      }}
      aria-label="Close banner"
    >
      <X className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 group-hover:rotate-90 transition-transform duration-200" />
    </Button>
    </div>
  );
}

export { Banner3 };