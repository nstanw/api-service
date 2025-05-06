import { PhanCongNhanVienThiCongInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class PhanCongNhanVienThiCongService {
  private logger = new Logger();

  async phanCongNhanVienThiCong(input: PhanCongNhanVienThiCongInput) {
    try {
      this.logger.debug('Calling phan cong nhan vien thi cong API', {
        url: CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG,
        input
      });
      
      const response = await ApiClient.post<any>(
        CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG,
        null,
        { params: input });
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully phan cong nhan vien thi cong', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error phan cong nhan vien thi cong', { error, input });
      throw error;
    }
  }
}
