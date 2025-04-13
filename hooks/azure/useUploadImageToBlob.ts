import { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const useUploadImageToBlob = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const uploadImage = async (
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    setIsLoading(true);
    try {
      const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
      const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
      const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;
      
      if (!accountName || !containerName || !sasToken) {
        throw new Error('Azure storage configuration is missing');
      }
     
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net/?${sasToken}`
      );
     
      const containerClient = blobServiceClient.getContainerClient(containerName);
     
      // Sanitize filename to prevent issues with special characters
      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFileName = `${uuidv4()}-${fileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
      
      // For progress tracking
      let lastReportedProgress = 0;
      
      await blockBlobClient.uploadBrowserData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
        onProgress: (progressEvent) => {
          if (onProgress && progressEvent.loadedBytes && file.size) {
            const progress = Math.round((progressEvent.loadedBytes / file.size) * 100);
            if (progress > lastReportedProgress) {
              lastReportedProgress = progress;
              onProgress(progress);
            }
          }
        }
      });
     
      const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${uniqueFileName}`;
      return publicUrl;
    } catch (error) {
      console.error('Azure Blob Upload Error:', error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
 
  return { uploadImage, isLoading };
};

export default useUploadImageToBlob;