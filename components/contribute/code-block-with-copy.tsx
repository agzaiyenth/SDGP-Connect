/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockWithCopyProps {
  code: string;
  className?: string;
}

export default function CodeBlockWithCopy({ code, className = "" }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={`relative bg-gray-900 rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-2">
        <code className="text-xs font-mono text-green-400 flex-1 overflow-x-auto whitespace-nowrap">
          {code}
        </code>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          className="ml-2 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
