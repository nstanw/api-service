import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { UpdateTonKhoSoSachInput } from '../types.js';

export class UpdateTonKhoSoSachService {
  private logger: Logger;
  private readonly className = 'UpdateTonKhoSoSachService';

  constructor() {
    this.logger = new Logger();
  }

  async updateTonKhoSoSach(input: UpdateTonKhoSoSachInput) {
    try {
      this.logger.debug('Gọi API UpdateTonKhoSoSach', {
        className: this.className,
        url: CONFIG.TOOLS.TON_KHO_HIEN_TAI.UPDATE_TON_KHO_SO_SACH,
        input
      });

      const response = await ApiClient.put(
        CONFIG.TOOLS.TON_KHO_HIEN_TAI.UPDATE_TON_KHO_SO_SACH, 
        input
      );

      this.logger.info('Cập nhật tồn kho sổ sách thành công', {
        className: this.className,
        input
      });
      
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi cập nhật tồn kho sổ sách', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}