import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import { CreateProfileDto, UpdateProfileDto, Profile } from '@/lib/backend/schemas/portfolio.schema';

export class BackendProfileService extends BackendBaseService<Profile> {
  constructor() {
    super('profile');
  }



  async create(data: CreateProfileDto): Promise<Profile> {
    const profiles = await this.model.count()

    if (profiles.length > 0) {
      throw ApiError.conflict('Profile already exists', {});
    }

    return this.model.create({
      data
    });
  }

  async findProfile(options: IQueryOptions = {}): Promise<Profile> {
    const profiles = await super.findMany(options);

    return profiles.data[0];
  }



}
