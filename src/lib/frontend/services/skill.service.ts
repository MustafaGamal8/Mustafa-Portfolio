import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  Skill,
  CreateSkillDto,
  UpdateSkillDto
} from '@/lib/backend/schemas/portfolio.schema';

export class SkillService extends BaseService {
  constructor() {
    super('/api/skills');
  }


  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<Skill[]> {
    const queryParams = { lang, ...params };
    return this.get<Skill[]>('', queryParams);
  }

  public async getPublicSkills(params?: IQueryParams): Promise<Skill[]> {
    return this.get<Skill[]>('', params);
  }

  public async create(data: CreateSkillDto): Promise<Skill> {
    return this.post<Skill>('', data);
  }

  public async update(data: UpdateSkillDto & { id: string }): Promise<Skill> {
    return this.put<Skill>('', data);
  }

  public async delete(id: string): Promise<Skill> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }

}

// Export singleton instance
export const skillService = new SkillService();
