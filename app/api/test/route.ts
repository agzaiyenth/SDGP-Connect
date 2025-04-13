import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

export async function GET(request: NextRequest) {
  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const sasToken = process.env.AZURE_SAS_TOKEN;

    // Print exact values for debugging (be careful with sasToken in production)
    console.log('Using these values:');
    console.log(`Account: ${accountName}`);
    console.log(`Container: ${containerName}`);
    console.log(`SAS token: ${sasToken?.substring(0, 10)}...`); 

    const containerSasUrl = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
    console.log(`Testing container URL: ${containerSasUrl.substring(0, containerSasUrl.indexOf('?') + 10)}...`);
    
    const containerClient = new ContainerClient(containerSasUrl);
    
    const blobItems = [];
    let i = 0;
    for await (const blob of containerClient.listBlobsFlat({ maxPageSize: 5 })) {
      if (i++ < 5) blobItems.push({ name: blob.name, blobType: blob.properties.blobType });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Azure Blob Storage',
      containerName,
      blobCount: i,
      sampleBlobs: blobItems,
      sasUrlFormat: `https://${accountName}.blob.core.windows.net/${containerName}?[SAS]`
    });
  } catch (error) {
    console.error('Detailed error information:', error);
    const errorMessage = error.message || String(error);
    const statusCode = error.statusCode || 500;
    const errorCode = error.code || 'Unknown';
    
    return NextResponse.json({
      success: false,
      message: 'Azure Blob Storage connection failed',
      error: errorMessage,
      statusCode: statusCode,
      errorCode: errorCode,
    }, { status: 500 });
  }
}