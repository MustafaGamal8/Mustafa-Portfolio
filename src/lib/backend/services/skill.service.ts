import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateSkillDto, UpdateSkillDto, Skill } from '@/lib/backend/schemas/portfolio.schema';

export class BackendSkillService extends BackendBaseService<Skill> {
  constructor() {
    super('skill');
  }


  async getPublicSkills(): Promise<any> {
    return await this.model.findMany({
      where: {
        isActive: true
      },
      include: {
        skillCategory: true
      },
      orderBy: { order: 'asc' }
    });
  }
  async create(data: CreateSkillDto): Promise<any> {
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

  async findByCategoryId(categoryId: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return await this.model.findMany({
      where: {
        skillCategoryId: categoryId,
        isActive: true,
        ...processedOptions.where
      },
      include: {
        ...processedOptions.include
      },
      orderBy: { order: 'asc' }
    });
  }

  async updateById(id: string, data: UpdateSkillDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Skill not found', {});
    }

    return await this.model.update({
      where: { id },
      data,

    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Skill not found', {});
    }

    return await this.model.delete({
      where: { id },

    });
  }
}
