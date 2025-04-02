import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { AddNhaSanXuatInput } from '../types.js';

export class AddNhaSanXuatService {
  private logger: Logger;
  private readonly className = 'AddNhaSanXuatService';

  constructor() {
    this.logger = new Logger();
  }

  async addNhaSanXuat(input: AddNhaSanXuatInput) {
    try {
      this.logger.debug('Gọi API thêm nhà sản xuất', {
        className: this.className,
        url: CONFIG.TOOLS.NHA_SAN_XUAT.ADD,
        input
      });

      const response = await ApiClient.post(CONFIG.TOOLS.NHA_SAN_XUAT.ADD, null,
        { params: input });

      this.logger.info('Thêm nhà sản xuất thành công', { 
        className: this.className,
        input 
      });
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi thêm nhà sản xuất', { 
        className: this.className,
        error,
        input 
      });
      throw error;
    }
  }
}
