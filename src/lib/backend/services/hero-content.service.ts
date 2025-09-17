import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateHeroContentDto, UpdateHeroContentDto, HeroContent } from '@/lib/backend/schemas/portfolio.schema';

export class BackendHeroContentService extends BackendBaseService<HeroContent> {
  constructor() {
    super('heroContent');
  }

  async create(data: CreateHeroContentDto): Promise<any> {
    // Check if hero content for this language already exists
    const existing = await this.model.findUnique({
      where: { lang: data.lang }
    });

    if (existing) {
      throw ApiError.conflict(`Hero content for language ${data.lang} already exists`, {});
    }

    return await this.model.create({
      data,
      include: {
        profileImage: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
            // Exclude base64 field to prevent base64 data in response
          }
        },
      }
    });
  }

  async findByLanguage(lang: string, options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options, true);

    return await this.model.findFirst({
      where: { lang },
      include: {
        profileImage: {
          select: {
            url: true,
          }
        },
        resume: {
          select: {
            url: true,
          }
        },
        ...processedOptions.include
      }
    });
  }

  async updateById(id: string, data: UpdateHeroContentDto): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Hero content not found', {});
    }


      // Transform `imageId` into relation-friendly syntax
    const { profileImageId, resumeId, ...rest } = data as any;
    const updateData: any = { ...rest };

    if (profileImageId !== undefined) {
      updateData.profileImage = profileImageId
        ? { connect: { id: profileImageId } }
        : { disconnect: true };
    }



    return await this.model.update({
      where: { id },
      data: updateData,
      include: {
        profileImage: {
          select: {
            id: true,
          }
        },
        resume: {
          select: {
            id: true,
          }
        },
      }
    });
  }

  async deleteById(id: string): Promise<any> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Hero content not found', {});
    }

    return await this.model.delete({
      where: { id },
      include: {
        profileImage: true,
      }
    });
  }
}
