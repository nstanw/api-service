import { PhanCongNhanVienKyThuatInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class PhanCongNhanVienKyThuatService {
  private logger = new Logger();

  async phanCongNhanVienKyThuat(input: PhanCongNhanVienKyThuatInput) {
    try {
      this.logger.debug('Calling phan cong nhan vien ky thuat (Mạng Cấp 4) API', {
        url: CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_KY_THUAT_MANG_CAP_4,
        input
      });
      
      const response = await ApiClient.post<any>(
        CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_KY_THUAT_MANG_CAP_4, 
        null,
        { params: input }
      );
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully assigned technical staff (Mạng Cấp 4)', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error assigning technical staff (Mạng Cấp 4)', { error, input });
      throw error;
    }
  }
}
