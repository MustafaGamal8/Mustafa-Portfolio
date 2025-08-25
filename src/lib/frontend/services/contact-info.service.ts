import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  ContactInfo,
  CreateContactInfoDto,
  UpdateContactInfoDto
} from '@/lib/backend/schemas/portfolio.schema';

export class ContactInfoService extends BaseService {
  constructor() {
    super('/api/contact-info');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<ContactInfo[]> {
    const queryParams = { lang, ...params };
    return this.get<ContactInfo[]>('', queryParams);
  }

  public async getPrimaryByLanguage(lang: string = 'EN'): Promise<ContactInfo> {
    const queryParams = { lang, primary: 'true' };
    return this.get<ContactInfo>('', queryParams);
  }

  public async create(data: CreateContactInfoDto): Promise<ContactInfo> {
    return this.post<ContactInfo>('', data);
  }

  public async update(data: UpdateContactInfoDto & { id: string }): Promise<ContactInfo> {
    return this.put<ContactInfo>('', data);
  }

  public async delete(id: string): Promise<ContactInfo> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const contactInfoService = new ContactInfoService();
