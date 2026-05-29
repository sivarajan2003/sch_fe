import BASE_API from "../api/baseurl";
import { getAccessToken } from "./token";

const UPLOAD_URL = BASE_API.replace("/api/v1/psms", "/api/v1/upload");

/**
 * Upload a file via the backend proxy to DigitalOcean Spaces.
 * Avoids browser CORS issues by routing through the Express server.
 */
export const uploadToSpaces = async (
  file: File,
  folder: string = "admission"
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const token = getAccessToken();

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    console.error("Upload failed:", json);
    throw new Error(json.message || `Failed to upload file: ${file.name}`);
  }

  return json.url as string;
};

export const uploadMultipleToSpaces = async (
  files: File[],
  folder: string = "admission"
): Promise<string[]> => {
  return Promise.all(files.map((f) => uploadToSpaces(f, folder)));
};

export const uploadToSpacesWithProgress = async (
  file: File,
  folder: string = "admission",
  onProgress?: (progress: number) => void
): Promise<string> => {
  if (onProgress) onProgress(0);
  const url = await uploadToSpaces(file, folder);
  if (onProgress) onProgress(100);
  return url;
};

export default { uploadToSpaces, uploadMultipleToSpaces, uploadToSpacesWithProgress };
