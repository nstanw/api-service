import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CONFIG } from '../config.js';
import https from 'https';

interface AbpResponse<T> {
  result: T;
  targetUrl: string | null;
  success: boolean;
  error: any | null;
  unAuthorizedRequest: boolean;
}

class ApiClient {
  private static instance: AxiosInstance;
  private static readonly TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ0MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuc3RhbmgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuc3RhbmhAbmF3YXNjby5jb20udm4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IlJNRFdIVExXTU1LUzdZNElGM1FMVlEyRUU2Q1ZRNjJRIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwixJDEg25nIGvDvSBuZ2jhu4kiXSwic3ViIjoiNDQyIiwianRpIjoiOWJlYmU0NzMtMmM5OC00NTczLTk2OGYtMzlmZjRmY2IzYTdkIiwiaWF0IjoxNzM3NTUyMTI5LCJuYmYiOjE3Mzc1NTIxMjksImV4cCI6MjA1MjkxMjEyOSwiaXNzIjoiRVJQIiwiYXVkIjoiRVJQIn0.i5NWUse89skdwOKFXnaBAYJA-JQBkNDYyO5ucfbVHi4';

  public static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: CONFIG.API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.TOKEN
        },
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      });

      this.instance.interceptors.response.use(
        response => response.data,
        error => {
          console.error('API Error:', error.response?.data || error.message);
          return Promise.reject(error);
        }
      );
    }
    return this.instance;
  }

  private static convertResponse<T>(response: any): AbpResponse<T> {
    return {
      result: response.result,
      targetUrl: response.targetUrl || null,
      success: response.success || false,
      error: response.error || null,
      unAuthorizedRequest: response.unAuthorizedRequest || false
    };
  }

  public static async get<T>(url: string, config?: any): Promise<AbpResponse<T>> {
    if (!config) config = {};
    if (!config.headers) config.headers = {};
    config.headers.Authorization = this.TOKEN;
    const response = await this.getInstance().get(url, config);
    return this.convertResponse<T>(response);
  }

  public static async post<T>(url: string, data?: any, config?: any): Promise<AbpResponse<T>> {
    if (!config) config = {};
    if (!config.headers) config.headers = {};
    config.headers.Authorization = this.TOKEN;
    const response = await this.getInstance().post(url, data, config);
    return this.convertResponse<T>(response);
  }

  public static async put<T>(url: string, data?: any, config?: any): Promise<AbpResponse<T>> {
    if (!config) config = {};
    if (!config.headers) config.headers = {};
    config.headers.Authorization = this.TOKEN;
    const response = await this.getInstance().put(url, data, config);
    return this.convertResponse<T>(response);
  }

  public static async delete<T>(url: string, config?: any): Promise<AbpResponse<T>> {
    if (!config) config = {};
    if (!config.headers) config.headers = {};
    config.headers.Authorization = this.TOKEN;
    const response = await this.getInstance().delete(url, config);
    return this.convertResponse<T>(response);
  }
}

export { ApiClient, AbpResponse };
