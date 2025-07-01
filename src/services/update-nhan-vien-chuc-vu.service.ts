import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { UpdateNhanVienChucVuInput } from '../types.js';

export class UpdateNhanVienChucVuService {
  private logger: Logger;
  private readonly className = 'UpdateNhanVienChucVuService';

  constructor() {
    this.logger = new Logger();
  }

  async updateNhanVienChucVu(input: UpdateNhanVienChucVuInput) {
    try {
      this.logger.debug('Gọi API UpdateNhanVienChucVu', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.UPDATE_NHAN_VIEN_CHUC_VU,
        input
      });

      const response = await ApiClient.put(
        CONFIG.TOOLS.TUANANH.UPDATE_NHAN_VIEN_CHUC_VU,
        null,
        { params: input }
      );

      this.logger.info('Cập nhật chức vụ nhân viên thành công', {
        className: this.className,
        input
      });

      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi cập nhật chức vụ nhân viên', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}
