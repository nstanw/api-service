import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { UpdateTTHSInput } from '../types.js';

export class UpdateTTHSMangCap4Service {
  private logger: Logger;

  private readonly className = 'UpdateTTHSMangCap4Service';

  constructor() {
    this.logger = new Logger();
  }

  async updateTTHS(input: UpdateTTHSInput) {
    try {
      this.logger.debug('Gọi API UpdateTTHSMangCap4', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.UPDATE_TTHS_MANG_CAP4,
        input
      });

      const response = await ApiClient.put(CONFIG.TOOLS.TUANANH.UPDATE_TTHS_MANG_CAP4, null, {
        params: input
      });

      this.logger.info('Cập nhật TTHS thành công', { 
        className: this.className,
        input 
      });
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi cập nhật TTHS', { 
        className: this.className,
        error, 
        input 
      });
      throw error;
    }
  }
}
