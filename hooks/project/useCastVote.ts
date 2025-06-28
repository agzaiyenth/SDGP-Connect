import { useState } from "react";
import axios from "axios";
import { VoteResponse } from "@/types/project/vote";
import { isValidIP } from "@/lib/ip-utils";

// Function to get client IP address with multiple fallback methods
const getClientIP = async (): Promise<string> => {
  // Array of IP detection services to try in order
  const ipServices = [
    {
      url: 'https://api.ipify.org?format=json',
      parseResponse: (data: any) => data.ip
    },
    {
      url: 'https://httpbin.org/ip',
      parseResponse: (data: any) => data.origin
    },
    {
      url: 'https://api.my-ip.io/ip.json',
      parseResponse: (data: any) => data.ip
    },
    {
      url: 'https://ipapi.co/ip/',
      parseResponse: (data: string) => data.trim()
    }
  ];

  // Try each service until one works
  for (const service of ipServices) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(service.url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        continue; // Try next service
      }

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }      const ip = service.parseResponse(data);
      
      // Validate IP format using utility function
      if (ip && typeof ip === 'string' && ip !== 'unknown' && isValidIP(ip)) {
        console.log(`Successfully obtained IP from ${service.url}: ${ip}`);
        return ip;
      }
    } catch (error) {
      console.warn(`Failed to get IP from ${service.url}:`, error);
      continue; // Try next service
    }
  }

  // If all services fail, try to get IP from browser's connection info (less reliable)
  try {
    // @ts-ignore - This is a browser API that may not be available in all browsers
    if (navigator.connection && navigator.connection.effectiveType) {
      console.warn('All IP services failed, using fallback method');
    }
  } catch (error) {
    // Ignore
  }

  console.warn('All IP detection methods failed, using unknown');
  return 'unknown';
};

export function useCastVote() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const castVote = async (projectId: string): Promise<VoteResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      // Get client IP address with fallback methods
      const clientIP = await getClientIP();
      
      // Log IP detection for debugging (remove in production)
      console.log('Voting with IP:', clientIP);

      const response = await axios.post("/api/projects/vote", {
        projectId,
        clientIP
      });

      // Log successful vote for debugging (remove in production)
      if (response.data.voterIP) {
        console.log('Vote cast successfully with IP:', response.data.voterIP);
      }

      return response.data;
    } catch (err) {
      let errorMessage = 'Failed to cast vote';      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        } else if (err.code === 'NETWORK_ERROR') {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout. Please try again.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Error casting vote:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    castVote,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}
