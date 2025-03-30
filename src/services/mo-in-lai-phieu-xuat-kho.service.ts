import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { MoInLaiPhieuXuatKhoVatTuInput } from '../types.js';

export class MoInLaiPhieuXuatKhoService {
  private logger: Logger;

  private readonly className = 'MoInLaiPhieuXuatKhoService';

  constructor() {
    this.logger = new Logger();
  }

  async moInLaiPhieuXuatKho(input: MoInLaiPhieuXuatKhoVatTuInput) {
    try {
      this.logger.debug('Gọi API mở in lại phiếu xuất kho vật tư', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.MO_IN_LAI_PHIEU_XUAT_KHO,
        input
      });

      const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.MO_IN_LAI_PHIEU_XUAT_KHO, null, {
        params: input
      });

      this.logger.info('Mở in lại phiếu xuất kho vật tư thành công', { 
        className: this.className,
        input 
      });
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi mở in lại phiếu xuất kho vật tư', { 
        className: this.className,
        error, 
        input 
      });
      throw error;
    }
  }
}
