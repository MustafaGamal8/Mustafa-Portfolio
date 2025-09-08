import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateProjectDto, UpdateProjectDto, Project } from '@/lib/backend/schemas/portfolio.schema';

export class BackendProjectService extends BackendBaseService<Project> {
  constructor() {
    super('project');
  }

  async create(data: CreateProjectDto): Promise<any> {
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
        image: {
          select: {
            url: true
          }
        },
        ...processedOptions.include
      },
      orderBy: { order: 'desc' }
    });
  }

  async findFeaturedByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return await this.model.findMany({
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
      orderBy: { order: 'desc' }
    });
  }

  async findByCategory(lang: string, category: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return await this.model.findMany({
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
      orderBy: { order: 'desc' }
    });
  }

  async updateById(id: string, data: UpdateProjectDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Project not found', {});
    }

    // Transform `imageId` into relation-friendly syntax
    const { imageId, ...rest } = data as any;
    const updateData: any = { ...rest };

    if (imageId !== undefined) {
      updateData.image = imageId
        ? { connect: { id: imageId } }
        : { disconnect: true };
    }

    return await this.model.update({
      where: { id },
      data: updateData,
      include: { image: true }
    });
  }


  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Project not found', {});
    }

    return await this.model.delete({
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

    return await this.model.update({
      where: { id },
      data: { isFeatured: !existing.isFeatured },
      include: {
        image: true
      }
    });
  }
}
