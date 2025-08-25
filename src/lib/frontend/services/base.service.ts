import { IQueryOptions, IQueryParams } from '@/interfaces/query.interface';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseService {
  protected api: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, params?: IQueryParams): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const isFormData = data instanceof FormData;

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    };

    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  public async remove<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }
}
