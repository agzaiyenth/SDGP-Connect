import imageCompression from 'browser-image-compression';

export type CompressType = 'logo' | 'cover_image' | 'slide' | 'team';

const compressionOptions: Record<CompressType, any> = {
  logo: { maxSizeMB: 0.5, maxWidthOrHeight: 512, fileType: 'image/jpeg' },
  cover_image: { maxSizeMB: 1.5, maxWidthOrHeight: 1920, fileType: 'image/jpeg' },
  slide: { maxSizeMB: 1.0, maxWidthOrHeight: 1600, fileType: 'image/jpeg' },
  team: { maxSizeMB: 0.5, maxWidthOrHeight: 512, fileType: 'image/jpeg' },
};

export async function compressImageFile(file: File, type: CompressType): Promise<File> {
  const options = compressionOptions[type];
  try {
    const compressedFile = await imageCompression(file, options);
    // Prefer JPEG or WebP
    if (compressedFile.type === 'image/jpeg' || compressedFile.type === 'image/webp') {
      return compressedFile;
    }
    // If not, convert to JPEG
    const converted = await imageCompression.getDataUrlFromFile(compressedFile);
    const blob = await (await fetch(converted)).blob();
    return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
  } catch (err) {
    // fallback to original file if compression fails
    return file;
  }
}
