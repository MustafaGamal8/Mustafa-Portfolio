import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { File } from '@prisma/client';
import { IQueryOptions } from '@/interfaces/query.interface';
import path from 'path';

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

  // Custom method to find file by string ID
  async findByStringId(id: string): Promise<File> {
    const file = await this.model.findUnique({
      where: { id }
    });

    if (!file) {
      throw ApiError.notFound('File not found', {
        field: 'id',
        reason: `File with ID ${id} does not exist`
      });
    }

    return file;
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

      // Create file record in database
      const createdFile = await this.model.create({
        data: {
          name: file.originalname,
          path: `/api/files/`,
          url: `/api/files/`, // This will be completed with the ID after creation
          type: file.mimetype,
          size: file.size,
          base64: `data:${file.mimetype};base64,${base64Data}` // Store full base64 data
        }
      });

      // Update the URL to include the file ID
      const updatedFile = await this.model.update({
        where: { id: createdFile.id },
        data: {
          path: `/api/files/${createdFile.id}`,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/files/${createdFile.id}`
        }
      });

      return updatedFile;
    } catch (error) {
      throw ApiError.internal('Failed to save file', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteFile(id: string): Promise<{ success: boolean }> {
    const file = await this.model.findUnique({
      where: { id },
      select: { id: true }
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
      select: { base64: true }
    });

    return file?.base64 || null;
  }

  // Utility method to validate base64 image
  private isValidBase64Image(dataUrl: string): boolean {
    const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
    return base64Pattern.test(dataUrl);
  }

  // Bulk delete files
  async bulkDeleteFiles(ids: string[]): Promise<{ success: boolean; deleted: number; deletedIds: string[] }> {
    // Check if all files exist
    const existingFiles = await this.model.findMany({
      where: { id: { in: ids } },
      select: { id: true }
    });

    if (existingFiles.length !== ids.length) {
      const foundIds = existingFiles.map((f: any) => f.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw ApiError.notFound('Some files not found', { missingIds });
    }

    try {
      // Delete all files in a transaction
      const result = await this.prisma.$transaction([
        this.model.deleteMany({
          where: { id: { in: ids } }
        })
      ]);

      return {
        success: true,
        deleted: result[0].count,
        deletedIds: ids
      };
    } catch (error) {
      throw ApiError.internal('Failed to delete files', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update file base URL
  async updateFileBaseUrl(id: string, newBaseUrl: string): Promise<File> {
    const file = await this.model.findUnique({
      where: { id }
    });

    if (!file) {
      throw ApiError.notFound('File not found');
    }

    try {
      const updatedFile = await this.model.update({
        where: { id },
        data: {
          url: `${newBaseUrl}/api/files/${id}`
        }
      });

      return updatedFile;
    } catch (error) {
      throw ApiError.internal('Failed to update file URL', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 