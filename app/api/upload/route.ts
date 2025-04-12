// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
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

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    
    if (!accountName || !accountKey || !containerName) {
      fs.unlinkSync(tempFilePath);
      
      console.log('Environment variables:');
      console.log('AZURE_STORAGE_ACCOUNT_NAME:', process.env.AZURE_STORAGE_ACCOUNT_NAME);
      console.log('AZURE_STORAGE_ACCOUNT_KEY:', process.env.AZURE_STORAGE_ACCOUNT_KEY ? '[EXISTS]' : '[MISSING]');
      console.log('AZURE_STORAGE_CONTAINER_NAME:', process.env.AZURE_STORAGE_CONTAINER_NAME);
      
      return NextResponse.json(
        { message: 'Azure Storage configuration missing' },
        { status: 500 }
      );
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );
    
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
    
    await blockBlobClient.uploadFile(tempFilePath, {
      blobHTTPHeaders: {
        blobContentType: file.type || 'application/octet-stream',
      },
    });
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