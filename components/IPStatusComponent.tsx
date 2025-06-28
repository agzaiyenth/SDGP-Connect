"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, Eye, EyeOff } from "lucide-react";
import { getIPStatus, isPrivateIP, isValidIP } from "@/lib/ip-utils";

interface IPStatusComponentProps {
  className?: string;
  showByDefault?: boolean;
}

export default function IPStatusComponent({ 
  className = "", 
  showByDefault = false 
}: IPStatusComponentProps) {
  const [isVisible, setIsVisible] = useState(showByDefault);
  const [ipInfo, setIpInfo] = useState<{
    ip: string;
    status: string;
    isPrivate: boolean;
    isValid: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchIPInfo = async () => {
    setLoading(true);
    try {
      // Try to get IP from a public service (same logic as in useCastVote)
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip || 'unknown';
      
      setIpInfo({
        ip,
        status: getIPStatus(ip),
        isPrivate: isPrivateIP(ip),
        isValid: isValidIP(ip)
      });
    } catch (error) {
      setIpInfo({
        ip: 'unknown',
        status: 'Failed to detect IP',
        isPrivate: false,
        isValid: false
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isVisible && !ipInfo) {
      fetchIPInfo();
    }
  }, [isVisible, ipInfo]);

  if (!isVisible) {
    return (
      <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsVisible(true)}
          className="shadow-lg"
        >
          <Info className="w-4 h-4 mr-1" />
          IP Status
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 left-4 z-50 bg-background border rounded-lg shadow-lg p-4 max-w-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          IP Detection Status
        </h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="h-6 w-6 p-0"
        >
          <EyeOff className="w-3 h-3" />
        </Button>
      </div>
      
      {loading ? (
        <div className="text-sm text-muted-foreground">
          Detecting IP...
        </div>
      ) : ipInfo ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">IP:</span>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              {ipInfo.ip}
            </code>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            <Badge 
              variant={ipInfo.isValid ? "default" : "destructive"}
              className="text-xs"
            >
              {ipInfo.status}
            </Badge>
          </div>
          
          {ipInfo.isPrivate && (
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              ⚠️ Private IP detected - voting may not work properly
            </div>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={fetchIPInfo}
            className="w-full h-6 text-xs"
          >
            Refresh
          </Button>
        </div>
      ) : null}
    </div>
  );
}
