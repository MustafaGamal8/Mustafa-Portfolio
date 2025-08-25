import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateProjectDto, UpdateProjectDto, Project } from '@/lib/backend/schemas/portfolio.schema';

export class BackendProjectService extends BackendBaseService<Project> {
  constructor() {
    super('project');
  }

  async create(data: CreateProjectDto): Promise<any> {
    return this.model.create({
      data,
      include: {
        image: true
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
        image: true,
        ...processedOptions.include
      },
      orderBy: { order: 'asc' }
    });
  }

  async findFeaturedByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return this.model.findMany({
      where: {
        lang,
        isActive: true,
        isFeatured: true,
        ...processedOptions.where
      },
      include: {
        image: true,
        ...processedOptions.include
      },
      orderBy: { order: 'asc' }
    });
  }

  async findByCategory(lang: string, category: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return this.model.findMany({
      where: {
        lang,
        category,
        isActive: true,
        ...processedOptions.where
      },
      include: {
        image: true,
        ...processedOptions.include
      },
      orderBy: { order: 'asc' }
    });
  }

  async updateById(id: string, data: UpdateProjectDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Project not found', {});
    }

    return this.model.update({
      where: { id },
      data,
      include: {
        image: true
      }
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Project not found', {});
    }

    return this.model.delete({
      where: { id },
      include: {
        image: true
      }
    });
  }

  async toggleFeatured(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Project not found', {});
    }

    return this.model.update({
      where: { id },
      data: { isFeatured: !existing.isFeatured },
      include: {
        image: true
      }
    });
  }
}
