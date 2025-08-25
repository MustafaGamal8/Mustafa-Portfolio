import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateAchievementDto, UpdateAchievementDto, Achievement } from '@/lib/backend/schemas/portfolio-new.schema';

export class BackendAchievementService extends BackendBaseService<Achievement> {
  constructor() {
    super('achievement');
  }

  async create(data: CreateAchievementDto): Promise<any> {
    return this.model.create({
      data,
      include: {
        icon: true
      }
    });
  }

  async findByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return this.model.findMany({
      where: {
        lang,
        isActive: true,
        ...processedOptions.where
      },
      include: {
        icon: true,
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

    return this.model.update({
      where: { id },
      data,
      include: {
        icon: true
      }
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Achievement not found', {});
    }

    return this.model.delete({
      where: { id },
      include: {
        icon: true
      }
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
