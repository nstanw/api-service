import { ChuyenNhanVienKyThuatGiaoKhoanInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class ChuyenNhanVienKyThuatGiaoKhoanService {
  private logger = new Logger();

  async chuyenNhanVienKyThuatGiaoKhoan(input: ChuyenNhanVienKyThuatGiaoKhoanInput) {
    try {
      this.logger.debug('Calling chuyen nhan vien ky thuat (Bản Giao Khoán) API', {
        url: CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_KY_THUAT_GIAO_KHOAN,
        input
      });
      
      const response = await ApiClient.post<any>(
        CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_KY_THUAT_GIAO_KHOAN, 
        null,
        { params: input }
      );
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully transferred technical employee (Bản Giao Khoán)', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error transferring technical employee (Bản Giao Khoán)', { error, input });
      throw error;
    }
  }
}
