import { BaseService } from './base.service';

interface ContentItem {
  id: string;
  type: 'hero' | 'about' | 'skill' | 'project' | 'achievement';
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  value?: string;
  icon?: string;
  category?: string;
  technologies?: string[];
  image?: string;
  link?: string;
  github?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  language: 'ar' | 'en';
  isRead: boolean;
  createdAt: string;
}

interface DashboardStats {
  totalViews: number;
  totalMessages: number;
  totalProjects: number;
  totalSkills: number;
  unreadMessages: number;
}

class DashboardService extends BaseService {
  constructor() {
    super('/api');
  }

  // Content Management - Using real API endpoints
  async getContentItems(type?: string): Promise<ContentItem[]> {
    const params: any = { endpoint: 'content' };
    if (type) params.type = type;
    return this.get('/dashboard', params);
  }

  async createContentItem(data: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
    return this.post('/dashboard?endpoint=content', data);
  }

  async updateContentItem(id: string, data: Partial<ContentItem>): Promise<ContentItem> {
    return this.put(`/dashboard?endpoint=content&id=${id}`, data);
  }

  async deleteContentItem(id: string): Promise<void> {
    return this.remove(`/dashboard?endpoint=content&id=${id}`);
  }

  // Messages Management
  async getMessages(filters?: { isRead?: boolean; language?: string }): Promise<Message[]> {
    const params = { endpoint: 'messages', ...filters };
    return this.get('/dashboard', params);
  }

  async markMessageAsRead(id: string): Promise<void> {
    return this.put(`/dashboard?endpoint=message-read&id=${id}`, {});
  }

  async deleteMessage(id: string): Promise<void> {
    return this.remove(`/dashboard?endpoint=message&id=${id}`);
  }

  async replyToMessage(id: string, reply: string): Promise<void> {
    return this.post(`/messages/${id}/reply`, { reply });
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return this.get('/stats');
  }

  // Backup and Export
  async exportData(type?: string): Promise<Blob> {
    const response = await this.api.get('/export', {
      params: { type },
      responseType: 'blob'
    });
    return response.data;
  }

  async importData(file: File): Promise<{ success: boolean; imported: number; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.post('/import', formData);
  }

  // File Upload
  async uploadFile(file: File, folder?: string): Promise<{ url: string; path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);

    return this.post('/upload', formData);
  }

  // Site Configuration
  async getSiteConfig(): Promise<any> {
    return this.get('/config');
  }

  async updateSiteConfig(config: any): Promise<any> {
    return this.put('/config', config);
  }

  // Analytics (if needed)
  async getAnalytics(period: 'day' | 'week' | 'month' = 'week'): Promise<any> {
    return this.get('/analytics', { params: { period } });
  }
}

export const dashboardService = new DashboardService();
