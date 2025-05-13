import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { UpdateTonKhoInput } from '../types.js';

export class UpdateTonKhoService {
  private logger: Logger;
  private readonly className = 'UpdateTonKhoService';

  constructor() {
    this.logger = new Logger();
  }

  async updateTonKho(input: UpdateTonKhoInput) {
    try {
      this.logger.debug('Gọi API UpdateTonKho', {
        className: this.className,
        url: CONFIG.TOOLS.TON_KHO.UPDATE,
        input
      });

      const response = await ApiClient.put(
        CONFIG.TOOLS.TON_KHO.UPDATE,
        null,
        { params: input }
      );

      this.logger.info('Cập nhật tồn kho thành công', {
        className: this.className,
        input
      });
      
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi cập nhật tồn kho', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}