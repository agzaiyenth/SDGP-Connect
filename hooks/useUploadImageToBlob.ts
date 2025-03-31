import { useState } from 'react';
// THIS SHOULD BE REPLACED WITH THE AZURE BLOB UPLOADING
/**
 * Hook to simulate uploading an image and returning a URL
 * @returns Object containing upload function and loading state
 */
export const useUploadImageToBlob = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Simulates uploading an image and returns a sample URL
   * @param file The image file to "upload"
   * @returns Promise resolving to a sample URL string
   */
  const uploadImage = async (file: File): Promise<string> => {
    // Reset state
    setError(null);
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a sample URL based on file name
      const fileName = encodeURIComponent(file.name);
      const sampleUrl = `https://sample-storage.example.com/images/${fileName}?timestamp=${Date.now()}`;

      return sampleUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
    error
  };
};

export default useUploadImageToBlob;