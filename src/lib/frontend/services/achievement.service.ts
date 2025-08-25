import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  Achievement,
  CreateAchievementDto,
  UpdateAchievementDto
} from '@/lib/backend/schemas/portfolio.schema';

export class AchievementService extends BaseService {
  constructor() {
    super('/api/achievements');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<Achievement[]> {
    const queryParams = { lang, ...params };
    return this.get<Achievement[]>('', queryParams);
  }

  public async create(data: CreateAchievementDto): Promise<Achievement> {
    return this.post<Achievement>('', data);
  }

  public async update(data: UpdateAchievementDto & { id: string }): Promise<Achievement> {
    return this.put<Achievement>('', data);
  }

  public async delete(id: string): Promise<Achievement> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const achievementService = new AchievementService();
