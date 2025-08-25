import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  HeroContent,
  CreateHeroContentDto,
  UpdateHeroContentDto
} from '@/lib/backend/schemas/portfolio.schema';

export class HeroContentService extends BaseService {
  constructor() {
    super('/api/hero-content');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<HeroContent[]> {
    const queryParams = { lang, ...params };
    return this.get<HeroContent[]>('', queryParams);
  }

  public async create(data: CreateHeroContentDto): Promise<HeroContent> {
    return this.post<HeroContent>('', data);
  }

  public async update(data: UpdateHeroContentDto & { id: string }): Promise<HeroContent> {
    return this.put<HeroContent>('', data);
  }

  public async delete(id: string): Promise<HeroContent> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const heroContentService = new HeroContentService();
