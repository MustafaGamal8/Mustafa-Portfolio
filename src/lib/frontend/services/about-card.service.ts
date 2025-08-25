import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  AboutCard,
  CreateAboutCardDto,
  UpdateAboutCardDto
} from '@/lib/backend/schemas/portfolio.schema';

export class AboutCardService extends BaseService {
  constructor() {
    super('/api/about-cards');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<AboutCard[]> {
    const queryParams = { lang, ...params };
    return this.get<AboutCard[]>('', queryParams);
  }

  public async create(data: CreateAboutCardDto): Promise<AboutCard> {
    return this.post<AboutCard>('', data);
  }

  public async update(data: UpdateAboutCardDto & { id: string }): Promise<AboutCard> {
    return this.put<AboutCard>('', data);
  }

  public async delete(id: string): Promise<AboutCard> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const aboutCardService = new AboutCardService();
