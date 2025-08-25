import { BaseService } from './base.service';
import { IQueryParams } from '@/interfaces/query.interface';
import {
  PersonalInfo,
  CreatePersonalInfoDto,
  UpdatePersonalInfoDto
} from '@/lib/backend/schemas/portfolio.schema';

export class PersonalInfoService extends BaseService {
  constructor() {
    super('/api/personal-info');
  }

  public async getByLanguage(lang: string = 'EN', params?: IQueryParams): Promise<PersonalInfo[]> {
    const queryParams = { lang, ...params };
    return this.get<PersonalInfo[]>('', queryParams);
  }

  public async create(data: CreatePersonalInfoDto): Promise<PersonalInfo> {
    return this.post<PersonalInfo>('', data);
  }

  public async update(data: UpdatePersonalInfoDto & { id: string }): Promise<PersonalInfo> {
    return this.put<PersonalInfo>('', data);
  }

  public async delete(id: string): Promise<PersonalInfo> {
    const response = await this.api.delete('', { data: { id } });
    return response.data;
  }
}

// Export singleton instance
export const personalInfoService = new PersonalInfoService();
