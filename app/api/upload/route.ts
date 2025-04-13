// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';
import * as os from 'os';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { message: 'Content type must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
   
    const tempFilePath = join(os.tmpdir(), `upload-${uuidv4()}`);
    await writeFile(tempFilePath, buffer);

    // Get Azure Storage credentials from environment variables
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const sasToken = process.env.AZURE_SAS_TOKEN;
   
    if (!accountName || !containerName || !sasToken) {
      fs.unlinkSync(tempFilePath);
     
      console.log('Environment variables:');
      console.log('AZURE_STORAGE_ACCOUNT_NAME:', accountName ? '[EXISTS]' : '[MISSING]');
      console.log('AZURE_STORAGE_CONTAINER_NAME:', containerName ? '[EXISTS]' : '[MISSING]');
      console.log('AZURE_SAS_TOKEN:', sasToken ? '[EXISTS]' : '[MISSING]');
     
      return NextResponse.json(
        { message: 'Azure Storage configuration missing' },
        { status: 500 }
      );
    }

    // Create blob service client using SAS token
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net/?${sasToken}`
    );
   
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
   
    // Upload the file
    await blockBlobClient.uploadFile(tempFilePath, {
      blobHTTPHeaders: {
        blobContentType: file.type || 'application/octet-stream',
      },
    });
    
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
   
    const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${uniqueFileName}`;
   
    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'Image uploaded successfully'
    });
   
  } catch (error) {
    console.error('Error uploading to Azure Blob Storage:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to upload image',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}