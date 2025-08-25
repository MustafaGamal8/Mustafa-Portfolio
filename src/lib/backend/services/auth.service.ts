import { BackendBaseService } from '@/lib/backend/bacendBase.service';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { IQueryOptions } from '@/interfaces/query.interface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class BackendAuthService extends BackendBaseService<User> {
  constructor() {
    super('user');
  }

  async login(data: LoginDto): Promise<{ user: any; token: string }> {
    // Find user
    const user = await this.model.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid credentials', {});
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid credentials', {});
    }

    // Update last login
    await this.model.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        lastLogin: new Date(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any> {
    const user = await this.model.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw ApiError.notFound('User not found', {});
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw ApiError.unauthorized('Invalid old password', {});
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await this.model.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    return { message: 'Password changed successfully' };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

      const user = await this.model.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        throw ApiError.unauthorized('Invalid token', {});
      }

      return user;
    } catch (error) {
      throw ApiError.unauthorized('Invalid token', {});
    }
  }

  async getAllUsers(options: IQueryOptions = {}): Promise<any> {
    const processedOptions = this.processQueryOptions(options);

    return this.model.findMany({
      select: {
        id: true,
        email: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      },
      ...processedOptions
    });
  }

  async deleteUser(userId: string): Promise<any> {
    const user = await this.model.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw ApiError.notFound('User not found', {});
    }

    return this.model.delete({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
}
