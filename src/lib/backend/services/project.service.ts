import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import {
  CreateProjectDto,
  UpdateProjectDto,
  Project,
  BulkCreateProjectsDto,
  BulkUpdateProjectsDto,
  BulkDeleteProjectsDto
} from '@/lib/backend/schemas/portfolio.schema';

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
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
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
        image: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
          }
        },
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
        image: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
          }
        },
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
      include: {
        image: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
          }
        }
      }
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
        image: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
          }
        }
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
        image: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            createdAt: true
          }
        }
      }
    });
  }

  // Bulk operations
  async bulkCreate(data: BulkCreateProjectsDto | any[]): Promise<any> {
    // Accept either { projects: [...] } or raw array
    const projects = Array.isArray(data) ? data : data?.projects;

    if (!Array.isArray(projects)) {
      throw ApiError.badRequest('Invalid payload for bulk create', {});
    }

    // Create all projects in a transaction
    const createdProjects = await this.prisma.$transaction(
      projects.map((project: any) => this.model.create({
        data: project,
        include: {
          image: {
            select: {
              id: true,
              name: true,
              url: true,
              type: true,
              size: true,
              createdAt: true
            }
          }
        }
      }))
    );

    return {
      success: true,
      created: createdProjects.length,
      projects: createdProjects
    };
  }

  async bulkUpdate(data: BulkUpdateProjectsDto): Promise<any> {
    const { projects } = data;

    // Update all projects in a transaction
    const updatedProjects = await this.prisma.$transaction(
      projects.map(project => {
        const { id, imageId, ...rest } = project as any;
        const updateData: any = { ...rest };

        if (imageId !== undefined) {
          updateData.image = imageId
            ? { connect: { id: imageId } }
            : { disconnect: true };
        }

        return this.model.update({
          where: { id },
          data: updateData,
          include: {
            image: {
              select: {
                id: true,
                name: true,
                url: true,
                type: true,
                size: true,
                createdAt: true
              }
            }
          }
        });
      })
    );

    return {
      success: true,
      updated: updatedProjects.length,
      projects: updatedProjects
    };
  }

  async bulkDelete(data: BulkDeleteProjectsDto): Promise<any> {
    const { ids } = data;

    // Check if all projects exist
    const existingProjects = await this.model.findMany({
      where: { id: { in: ids } }
    });

    if (existingProjects.length !== ids.length) {
      const foundIds = existingProjects.map((p: any) => p.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw ApiError.notFound('Some projects not found', { missingIds });
    }

    // Delete all projects in a transaction
    const deletedProjects = await this.prisma.$transaction([
      this.model.deleteMany({
        where: { id: { in: ids } }
      })
    ]);

    return {
      success: true,
      deleted: deletedProjects[0].count,
      deletedIds: ids
    };
  }
}
