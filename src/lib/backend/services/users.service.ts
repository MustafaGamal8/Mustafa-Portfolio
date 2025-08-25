import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

export class BackendUsersService extends BackendBaseService<User> {
  constructor() {
    super('user');
  }

  async createDefaultRootUser(): Promise<{ message: string, data?: User }> {
    const existingRootUser = await this.model.findFirst({
      where: { email: 'mustafa.gamal.elsayed@gmail.com' }
    });

    if (existingRootUser) {
      return {
        message: 'System already initialized',
      };
    }
    const user = await this.model.create({
      data: {
        email: 'mustafa.gamal.elsayed@gmail.com',
        password: await hash('password123', 12),
      }
    })
    return {
      message: 'System initialized successfully',
      data: user
    };
  }

}
