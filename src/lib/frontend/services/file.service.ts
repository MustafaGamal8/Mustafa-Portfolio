import { BaseService } from './base.service';

export interface FileData {
  id: string;
  name: string;
  url: string;
  path: string;
  type: string;
  size: number;
  base64: string;
  createdAt: string;
  updatedAt: string;
}

export class FileService extends BaseService {
  constructor() {
    super('/api');
  }

  async uploadFile(file: File): Promise<FileData> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  async getFiles(page = 1, limit = 12): Promise<{
    files: FileData[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const response = await this.get<{
      files: FileData[];
      total: number;
      totalPages: number;
      currentPage: number;
    }>(`/files?page=${page}&limit=${limit}`);
    return response;
  }

  async deleteFile(id: string): Promise<{ success: boolean }> {
    const response = await this.remove<{ success: boolean }>(`/files/${id}`);
    return response;
  }

  async getFileContent(id: string): Promise<string> {
    const response = await fetch(`/api/files/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch file content');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  // Get file details
  async getFile(id: string): Promise<FileData> {
    const response = await this.get<FileData>(`/files/${id}/details`);
    return response;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileService = new FileService();
