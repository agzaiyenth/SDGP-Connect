import { useState } from 'react';

const useUploadImageToBlob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload');
      }

      return data.url;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading };
};

export default useUploadImageToBlob;
