import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreatePersonalInfoDto, UpdatePersonalInfoDto, PersonalInfo } from '@/lib/backend/schemas/portfolio-new.schema';

export class BackendPersonalInfoService extends BackendBaseService<PersonalInfo> {
  constructor() {
    super('personalInfo');
  }

  async create(data: CreatePersonalInfoDto): Promise<any> {
    // Check if personal info for this language already exists
    const existing = await this.model.findUnique({
      where: { lang: data.lang }
    });

    if (existing) {
      throw ApiError.conflict(`Personal info for language ${data.lang} already exists`, {});
    }

    return this.model.create({
      data,
      include: {
        image: true,
        resume: true
      }
    });
  }

  async findByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options, true);

    return this.model.findUnique({
      where: { lang },
      include: {
        image: true,
        resume: true,
        ...processedOptions.include
      }
    });
  }

  async updateById(id: string, data: UpdatePersonalInfoDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Personal info not found', {});
    }

    return this.model.update({
      where: { id },
      data,
      include: {
        image: true,
        resume: true
      }
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Personal info not found', {});
    }

    return this.model.delete({
      where: { id },
      include: {
        image: true,
        resume: true
      }
    });
  }
}
