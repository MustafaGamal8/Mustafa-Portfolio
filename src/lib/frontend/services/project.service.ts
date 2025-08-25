import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  Project,
  CreateProjectDto,
  UpdateProjectDto
} from '@/lib/backend/schemas/portfolio.schema';

export class ProjectService extends BaseService {
  constructor() {
    super('/api/projects');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<Project[]> {
    const queryParams = { lang, ...params };
    return this.get<Project[]>('', queryParams);
  }

  public async getFeaturedByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<Project[]> {
    const queryParams = { lang, featured: 'true', ...params };
    return this.get<Project[]>('', queryParams);
  }

  public async getByCategory(lang: string = 'EN', category: string, params?: IQueryParams): Promise<Project[]> {
    const queryParams = { lang, category, ...params };
    return this.get<Project[]>('', queryParams);
  }

  public async create(data: CreateProjectDto): Promise<Project> {
    return this.post<Project>('', data);
  }

  public async update(data: UpdateProjectDto & { id: string }): Promise<Project> {
    return this.put<Project>('', data);
  }

  public async delete(id: string): Promise<Project> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const projectService = new ProjectService();
