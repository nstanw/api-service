import { ChuyenNhanVienThiCongGiaoKhoanInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class ChuyenNhanVienThiCongGiaoKhoanService {
  private logger = new Logger();

  async chuyenNhanVienThiCongGiaoKhoan(input: ChuyenNhanVienThiCongGiaoKhoanInput) {
    try {
      this.logger.debug('Calling chuyen nhan vien thi cong giao khoan API', {
        url: CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_THI_CONG,
        input
      });
      
      const response = await ApiClient.post<any>(
        CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_THI_CONG, 
        null,
        { params: input }
      );
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully transferred construction employee', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error transferring construction employee', { error, input });
      throw error;
    }
  }
}
