// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as os from 'os';
import * as fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = join(os.tmpdir(), `upload-${uuidv4()}`);
    await writeFile(tempFilePath, buffer);

    const account = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
    const container = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
    const sas = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

    if (!account || !container || !sas) {
      fs.unlinkSync(tempFilePath);
      return NextResponse.json({ message: 'Missing Azure config' }, { status: 500 });
    }

    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);
    const containerClient = blobServiceClient.getContainerClient(container);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '');
    const uniqueName = `${uuidv4()}-${sanitizedFileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueName);

    await blockBlobClient.uploadFile(tempFilePath, {
      blobHTTPHeaders: { blobContentType: file.type }
    });

    fs.unlinkSync(tempFilePath);

    const publicUrl = `https://${account}.blob.core.windows.net/${container}/${uniqueName}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
