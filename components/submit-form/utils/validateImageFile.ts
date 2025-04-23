// utils/validateImageFile.ts

export function validateImageFile(file: File, maxSizeMB = 4): string | null {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, JPEG, or PNG files are allowed.";
  }
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB.`;
  }
  return null;
}
