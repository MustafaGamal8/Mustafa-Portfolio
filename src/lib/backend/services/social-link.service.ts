import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateSocialLinkDto, UpdateSocialLinkDto, SocialLink } from '@/lib/backend/schemas/portfolio.schema';

export class BackendSocialLinkService extends BackendBaseService<SocialLink> {
  constructor() {
    super('socialLink');
  }

  async create(data: CreateSocialLinkDto): Promise<any> {
    // Check if social link with this name already exists for this language
    const existing = await this.model.findUnique({
      where: {
        lang_name: {
          lang: data.lang,
          name: data.name
        }
      }
    });

    if (existing) {
      throw ApiError.conflict(`Social link ${data.name} already exists for language ${data.lang}`, {});
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
      orderBy: { order: 'asc' }
    });
  }

  async updateById(id: string, data: UpdateSocialLinkDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Social link not found', {});
    }

    return await this.model.update({
      where: { id },
      data
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Social link not found', {});
    }

    return await this.model.delete({
      where: { id }
    });
  }

  async reorderLinks(linkIds: string[]): Promise<any> {
    const updates = linkIds.map((id, index) =>
      this.model.update({
        where: { id },
        data: { order: index }
      })
    );

    return Promise.all(updates);
  }
}
