import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateAchievementDto, UpdateAchievementDto, Achievement } from '@/lib/backend/schemas/portfolio.schema';

export class BackendAchievementService extends BackendBaseService<Achievement> {
  constructor() {
    super('achievement');
  }

  async create(data: CreateAchievementDto): Promise<any> {
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
      orderBy: { order: 'asc' }
    });
  }

  async updateById(id: string, data: UpdateAchievementDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Achievement not found', {});
    }

    return await this.model.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Achievement not found', {});
    }

    return await this.model.delete({
      where: { id },
  
    });
  }

  async reorderAchievements(achievementIds: string[]): Promise<any> {
    const updates = achievementIds.map((id, index) =>
      this.model.update({
        where: { id },
        data: { order: index }
      })
    );

    return Promise.all(updates);
  }
}
