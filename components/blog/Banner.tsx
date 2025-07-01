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
  message = "We have launched AI-powered computing solutions to revolutionize your workflow!",
  linkText = "Learn more",
  linkHref = "#",
}: Banner3Props) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-between rounded-xl border border-gray-200 p-6 bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Badge className="bg-gradient-to-r from-black to-gray-800 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200">
          {badgeText}
        </Badge>
        <span className="text-gray-800 font-medium text-base leading-relaxed">{message}</span>
        <a
          href={linkHref}
          className="inline-flex items-center text-sm font-semibold text-black hover:text-gray-700 hover:underline transition-colors duration-200 group"
        >
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4 text-black group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 shrink-0 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm group"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
      </Button>
    </div>
  );
}

export { Banner3 };