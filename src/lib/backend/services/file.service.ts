import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { File } from '@prisma/client';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';
import { IQueryOptions } from '@/interfaces/query.interface';


const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export class BackendFileService extends BackendBaseService<File> {
  private readonly storageDir: string;

  constructor() {
    super('file');
    this.storageDir = join(process.cwd(), 'storage', 'files');
  }

  private async ensureStorageDir() {
    if (!existsSync(this.storageDir)) {
      await mkdir(this.storageDir, { recursive: true });
    }
  }

  async findById(id: number, options: IQueryOptions = {}): Promise<File> {
    return super.findById(id, options)
  }

  async getFileByUrl(url: string): Promise<File | null> {
    const file = await this.model.findFirst({
      where: { url:  process.env.APP_URL + url }
    });
    return file ;
  }

  async uploadFile(file: Express.Multer.File): Promise<File> {
  

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw ApiError.badRequest('File too large', {
        field: 'file',
        reason: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      });
    }

    // Ensure storage directory exists
    await this.ensureStorageDir();

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(this.storageDir, fileName);

    try {
      // Save file
      await writeFile(filePath, file.buffer);
      // Create file record in database
      const fileUrl = process.env.APP_URL + `/storage/files/${fileName}`;
      return this.model.create({
        data: {
          name: file.originalname,
          path: `/storage/files/${fileName}`,
          url: fileUrl,
          type: file.mimetype,
          size: file.size
        }
      });
    } catch (error) {
      // Clean up file if database operation fails
      await unlink(filePath).catch(() => { });
      throw ApiError.internal('Failed to save file', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteFile(id: number): Promise<{ success: boolean }> {
    const file = await this.model.findUnique({
      where: { id }
    });

    if (!file) {
      throw ApiError.notFound('File not found');
    }

    try {
      // Delete file from storage
      const filePath = join(process.cwd(), file.path);
      await unlink(filePath).catch(() => { });

      // Delete database record
      return super.delete(id);
    } catch (error) {
      throw ApiError.internal('Failed to delete file', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 