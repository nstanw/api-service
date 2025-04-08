import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { ThemNhanVienCongViecSXNInput } from '../types.js';

export class ThemNhanVienSXNService {
  private logger: Logger;
  private readonly className = 'ThemNhanVienSXNService';

  constructor() {
    this.logger = new Logger();
  }

  async themNhanVienSXN(input: ThemNhanVienCongViecSXNInput) {
    try {
      this.logger.debug('Gọi API thêm nhân viên công việc SXN', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.THEM_NHAN_VIEN_SXN,
        input
      });

      const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.THEM_NHAN_VIEN_SXN, null, {
        params: input
      });

      this.logger.info('Thêm nhân viên công việc SXN thành công', {
        className: this.className,
        input
      });

      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi thêm nhân viên công việc SXN', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}
