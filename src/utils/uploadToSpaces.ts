import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
    endpoint: import.meta.env.VITE_DO_SPACES_ENDPOINT,
    region: import.meta.env.VITE_DO_SPACES_REGION || 'blr1',
    credentials: {
        accessKeyId: import.meta.env.VITE_DO_SPACES_KEY,
        secretAccessKey: import.meta.env.VITE_DO_SPACES_SECRET,
    },
});

/**
 * Upload a file to DigitalOcean Spaces
 * @param file - The file to upload
 * @param folder - The folder path in the bucket (e.g., 'admission')
 * @returns The CDN URL of the uploaded file
 */
export const uploadToSpaces = async (file: File, folder: string = 'admission'): Promise<string> => {
    try {
        const bucket = import.meta.env.VITE_DO_SPACES_BUCKET;
        const cdnEndpoint = import.meta.env.VITE_DO_SPACES_CDN_ENDPOINT;
        const endpoint = import.meta.env.VITE_DO_SPACES_ENDPOINT;
        const key = import.meta.env.VITE_DO_SPACES_KEY;
        const secret = import.meta.env.VITE_DO_SPACES_SECRET;

        // Validate environment variables
        if (!bucket || !cdnEndpoint || !endpoint || !key || !secret) {
            console.error('Missing environment variables:', {
                bucket: !!bucket,
                cdnEndpoint: !!cdnEndpoint,
                endpoint: !!endpoint,
                key: !!key,
                secret: !!secret,
            });
            throw new Error('DigitalOcean Spaces configuration is incomplete. Check .env.local');
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.round(Math.random() * 1e9);
        const fileExtension = file.name.split('.').pop();
        const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

        console.log('Upload details:', {
            bucket,
            endpoint,
            fileName,
            fileSize: file.size,
            fileType: file.type,
        });

        // Convert File to ArrayBuffer for browser compatibility
        const fileBuffer = await file.arrayBuffer();
        const fileUint8Array = new Uint8Array(fileBuffer);

        // Prepare upload parameters
        const uploadParams = {
            Bucket: bucket,
            Key: fileName,
            Body: fileUint8Array, // Use Uint8Array instead of File
            ACL: 'public-read' as const,
            ContentType: file.type,
            //ContentLength: file.size,
        };

        // Upload to Spaces
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Return CDN URL
        const fileUrl = `${cdnEndpoint}/${fileName}`;
        console.log('Upload successful:', fileUrl);
        return fileUrl;
    } catch (error: any) {
        console.error('Error uploading file to Spaces:', error);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            code: error.code,
            statusCode: error.$metadata?.httpStatusCode,
        });
        throw new Error(`Failed to upload file: ${file.name}`);
    }
};

/**
 * Upload multiple files to DigitalOcean Spaces
 * @param files - Array of files to upload
 * @param folder - The folder path in the bucket
 * @returns Array of CDN URLs
 */
export const uploadMultipleToSpaces = async (
    files: File[],
    folder: string = 'admission'
): Promise<string[]> => {
    try {
        const uploadPromises = files.map((file) => uploadToSpaces(file, folder));
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        console.error('Error uploading multiple files:', error);
        throw error;
    }
};

/**
 * Upload file with progress tracking
 * @param file - The file to upload
 * @param folder - The folder path in the bucket
 * @param onProgress - Callback for upload progress (0-100)
 * @returns The CDN URL of the uploaded file
 */
export const uploadToSpacesWithProgress = async (
    file: File,
    folder: string = 'admission',
    onProgress?: (progress: number) => void
): Promise<string> => {
    try {
        // For now, we'll simulate progress since S3 SDK doesn't provide built-in progress
        // In production, you might want to use a library that supports progress
        if (onProgress) onProgress(0);

        const url = await uploadToSpaces(file, folder);

        if (onProgress) onProgress(100);
        return url;
    } catch (error) {
        console.error('Error uploading file with progress:', error);
        throw error;
    }
};

export default {
    uploadToSpaces,
    uploadMultipleToSpaces,
    uploadToSpacesWithProgress,
};
