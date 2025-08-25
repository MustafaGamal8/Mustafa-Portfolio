import { Language } from '@prisma/client';
import { BaseService } from './base.service';
import { AxiosResponse } from 'axios';


export class AuthService extends BaseService {
  constructor() {
    super('/api/auth');
  }

  public async login(email: string, password: string): Promise<string> {
    const response: AxiosResponse<string> = await this.post('/login', { email, password });
    return response.data;
  }

  public async logout(): Promise<void> {
    const response: AxiosResponse<string> = await this.post('/logout',{});
  }
  public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any> {
    const response: AxiosResponse<any> = await this.post('/change-password', { userId, oldPassword, newPassword });
    return response.data;
  }
}

// Export singleton instance
export const authService = new AuthService();


