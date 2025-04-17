import { useState } from 'react';
import axios from 'axios';

const useUploadImageToBlob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    console.log('Uploading file:', file);
    console.log('FormData:', formData);
    
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress);
        }
      },
    });
  
    console.log('Upload response:', response);
    return response.data.url;
  };
  
  

  return { uploadImage, isLoading };
};

export default useUploadImageToBlob;
