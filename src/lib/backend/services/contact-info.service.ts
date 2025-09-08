import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateContactInfoDto, UpdateContactInfoDto, ContactInfo } from '@/lib/backend/schemas/portfolio.schema';

export class BackendContactInfoService extends BackendBaseService<ContactInfo> {
  constructor() {
    super('contactInfo');
  }

  async create(data: CreateContactInfoDto): Promise<any> {
    // Check if contact info with this type already exists for this language
    const existing = await this.model.findUnique({
      where: {
        lang_type: {
          lang: data.lang,
          type: data.type
        }
      }
    });

    if (existing) {
      throw ApiError.conflict(`Contact info of type ${data.type} already exists for language ${data.lang}`, {});
    }

    return await this.model.create({
      data
    });
  }

  async findByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return await this.model.findMany({
      where: {
        lang,
        isActive: true,
        ...processedOptions.where
      },
      orderBy: { order: 'desc' }
    });
  }

  async findPrimaryByLanguage(lang: string): Promise<any> {
    return await this.model.findMany({
      where: {
        lang,
        isPrimary: true,
        isActive: true
      },
      orderBy: { order: 'desc' }
    });
  }

  async updateById(id: string, data: UpdateContactInfoDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Contact info not found', {});
    }

    return await this.model.update({
      where: { id },
      data
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Contact info not found', {});
    }

    return await this.model.delete({
      where: { id }
    });
  }

  async setPrimary(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Contact info not found', {});
    }

    // Remove primary from all other contacts of the same language and type
    await this.model.updateMany({
      where: {
        lang: existing.lang,
        type: existing.type,
        id: { not: id }
      },
      data: { isPrimary: false }
    });

    // Set this one as primary
    return await this.model.update({
      where: { id },
      data: { isPrimary: true }
    });
  }
}
