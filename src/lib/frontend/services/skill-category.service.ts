import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  SkillCategory,
  CreateSkillCategoryDto,
  UpdateSkillCategoryDto
} from '@/lib/backend/schemas/portfolio.schema';

export class SkillCategoryService extends BaseService {
  constructor() {
    super('/api/skill-categories');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<SkillCategory[]> {
    const queryParams = { lang, ...params };
    return this.get<SkillCategory[]>('', queryParams);
  }

  public async create(data: CreateSkillCategoryDto): Promise<SkillCategory> {
    return this.post<SkillCategory>('', data);
  }

  public async update(data: UpdateSkillCategoryDto & { id: string }): Promise<SkillCategory> {
    return this.put<SkillCategory>('', data);
  }

  public async delete(id: string): Promise<SkillCategory> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const skillCategoryService = new SkillCategoryService();
