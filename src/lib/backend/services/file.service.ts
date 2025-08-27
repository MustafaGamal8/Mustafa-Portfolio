import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { File } from '@prisma/client';
import { IQueryOptions } from '@/interfaces/query.interface';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// Define the file upload interface
interface UploadedFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
  size: number;
}

export class BackendFileService extends BackendBaseService<File> {
  constructor() {
    super('file');
  }

  async getFileByUrl(url: string): Promise<File | null> {
    const file = await this.model.findFirst({
      where: { url }
    });
    return file;
  }

  async uploadFile(file: UploadedFile): Promise<File> {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw ApiError.badRequest('File too large', {
        field: 'file',
        reason: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      });
    }

    // Validate file type (images only for base64 storage)
    const allowedMimeTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf' // Allow PDF for resumes
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw ApiError.badRequest('Invalid file type', {
        field: 'file',
        reason: 'Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed'
      });
    }

    try {
      // Convert file to base64
      const base64Data = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

      // Create file record in database with base64 data
      return await this.model.create({
        data: {
          name: file.originalname,
          path: dataUrl, // Store base64 data URL in path field
          url: dataUrl,  // Store base64 data URL in url field
          type: file.mimetype,
          size: file.size
        }
      });
    } catch (error) {
      throw ApiError.internal('Failed to save file', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteFile(id: string): Promise<{ success: boolean }> {
    const file = await this.model.findUnique({
      where: { id }
    });

    if (!file) {
      throw ApiError.notFound('File not found');
    }

    try {
      // Delete database record (no physical file to delete since it's base64)
      await this.model.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      throw ApiError.internal('Failed to delete file', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get file content as base64 (for direct display)
  async getFileContent(id: string): Promise<string | null> {
    const file = await this.model.findUnique({
      where: { id },
      select: { url: true }
    });

    return file?.url || null;
  }

  // Utility method to validate base64 image
  private isValidBase64Image(dataUrl: string): boolean {
    const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
    return base64Pattern.test(dataUrl);
  }
} 