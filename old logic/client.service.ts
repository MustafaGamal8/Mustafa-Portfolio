import { User, CreateUserDto, UpdateUserDto, ApiResponse } from '@/lib/backend/schemas/user.schema';
import { BaseService } from './base.service';

export class ClientService extends BaseService {
  constructor() {
    super('/api/clients');
  }

  async getAll(params = {}): Promise<ApiResponse<User[]>> {
    return this.get('', params);
  }

  async getById(id: string): Promise<ApiResponse<User>> {
    return this.get(`/${id}`);
  }

  async create(data: CreateUserDto): Promise<ApiResponse<User>> {
    return this.post('', data);
  }

  async update(id: string, data: UpdateUserDto): Promise<ApiResponse<User>> {
    return this.put(`/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.remove(`/${id}`);
  }
} 