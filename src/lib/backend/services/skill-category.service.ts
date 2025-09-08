import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateSkillCategoryDto, UpdateSkillCategoryDto, SkillCategory } from '@/lib/backend/schemas/portfolio.schema';

export class BackendSkillCategoryService extends BackendBaseService<SkillCategory> {
  constructor() {
    super('skillCategory');
  }

  async create(data: CreateSkillCategoryDto): Promise<any> {
    return await this.model.create({
      data,
      include: {
        skills: {
          orderBy: { order: 'desc' }
        }
      }
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
        skills: {
          where: { isActive: true },

          orderBy: { order: 'desc' }
        },
        ...processedOptions.include
      },
      orderBy: { order: 'desc' }
    });
  }


  async updateById(id: string, data: UpdateSkillCategoryDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Skill category not found', {});
    }
    return await this.model.update({
      where: { id },
      data,
      include: {
        skills: {

          orderBy: { order: 'desc' }
        }
      }
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Skill category not found', {});
    }

    return await this.model.delete({
      where: { id },
      include: {
        skills: true
      }
    });
  }
}
