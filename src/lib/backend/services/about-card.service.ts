import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateAboutCardDto, UpdateAboutCardDto, AboutCard } from '@/lib/backend/schemas/portfolio.schema';

export class BackendAboutCardService extends BackendBaseService<AboutCard> {
  constructor() {
    super('aboutCard');
  }

  async create(data: CreateAboutCardDto): Promise<any> {
    return await this.model.create({
      data,

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
      include: {
        ...processedOptions.include
      },
      orderBy: { order: 'desc' }
    });
  }

  async updateById(id: string, data: UpdateAboutCardDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('About card not found', {});
    }

    return await this.model.update({
      where: { id },
      data,

    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('About card not found', {});
    }

    return await this.model.delete({
      where: { id },

    });
  }

  async reorderCards(cardIds: string[]): Promise<any> {
    const updates = cardIds.map((id, index) =>
      this.model.update({
        where: { id },
        data: { order: index }
      })
    );

    return Promise.all(updates);
  }
}
