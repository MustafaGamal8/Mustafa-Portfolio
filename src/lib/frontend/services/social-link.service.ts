import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  SocialLink,
  CreateSocialLinkDto,
  UpdateSocialLinkDto
} from '@/lib/backend/schemas/portfolio.schema';

export class SocialLinkService extends BaseService {
  constructor() {
    super('/api/social-links');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<SocialLink[]> {
    const queryParams = { lang, ...params };
    return this.get<SocialLink[]>('', queryParams);
  }

  public async create(data: CreateSocialLinkDto): Promise<SocialLink> {
    return this.post<SocialLink>('', data);
  }

  public async update(data: UpdateSocialLinkDto & { id: string }): Promise<SocialLink> {
    return this.put<SocialLink>('', data);
  }

  public async delete(id: string): Promise<SocialLink> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const socialLinkService = new SocialLinkService();
