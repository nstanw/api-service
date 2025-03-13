import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { BreakfastRegistration, ApiResponse } from '../types.js';

export class BreakfastService {
  async register(data: BreakfastRegistration): Promise<ApiResponse<any>> {
    try {
      const response = await ApiClient.post<any>(CONFIG.TOOLS.BREAKFAST.REGISTER, data);
      return {
        result: response.result,
        targetUrl: response.targetUrl,
        success: response.success,
        error: null,
        unAuthorizedRequest: false
      };
    } catch (error: any) {
      console.error('Error registering breakfast:', error);
      return {
        result: null,
        targetUrl: null,
        success: false,
        error: error.message || 'Unknown error',
        unAuthorizedRequest: error.response?.status === 401
      };
    }
  }
}

export const breakfastService = new BreakfastService();
