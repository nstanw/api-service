import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { CreateKhaiBaoNgayNghiInput, ApiResponse } from '../types.js';

export class DangKyDieuDongService {
  async dangKyDieuDong(input: CreateKhaiBaoNgayNghiInput): Promise<ApiResponse<any>> {
    try {
      const response = await ApiClient.post<any>(CONFIG.TOOLS.TUANANH.DANG_KY_DIEU_DONG, input);
      return {
        result: response.result,
        targetUrl: response.targetUrl,
        success: response.success,
        error: null,
        unAuthorizedRequest: false
      };
    } catch (error: any) {
      console.error('Error registering dieu dong:', error);
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

export const dangKyDieuDongService = new DangKyDieuDongService();
