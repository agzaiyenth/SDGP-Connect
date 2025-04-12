import { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const useUploadImageToBlob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    try {
      const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME!;
      const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME!;
      const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN!;
      
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net/?${sasToken}`
      );
      
      const containerClient = blobServiceClient.getContainerClient(containerName);
      
      const uniqueFileName = `${uuidv4()}-${file.name}`;
      const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
      
      await blockBlobClient.uploadBrowserData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      });
      
      const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${uniqueFileName}`;
      return publicUrl;
    } catch (error) {
      console.error('Azure Blob Upload Error:', error);
      throw new Error('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };
  
  return { uploadImage, isLoading };
};

export default useUploadImageToBlob;