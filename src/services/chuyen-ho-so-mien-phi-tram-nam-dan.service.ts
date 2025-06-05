import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { ChuyenHoSoMienPhiTramNamDanInput } from '../types.js';

export class ChuyenHoSoMienPhiTramNamDanService {
  private logger: Logger;
  private readonly className = 'ChuyenHoSoMienPhiTramNamDanService';

  constructor() {
    this.logger = new Logger();
  }

  async chuyenHoSoMienPhiTramNamDan(input: ChuyenHoSoMienPhiTramNamDanInput) {
    try {
      this.logger.debug('Gọi API ChuyenHoSoMienPhiTramNamDan', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.CHUYEN_HO_SO_MIEN_PHI_TRAM_NAM_DAN,
        input
      });

      // POST với array body
      const response = await ApiClient.post(
        CONFIG.TOOLS.TUANANH.CHUYEN_HO_SO_MIEN_PHI_TRAM_NAM_DAN,
        input.danhSachMa // Array body
      );

      this.logger.info('Chuyển hồ sơ miễn phí trạm nâm dan thành công', {
        className: this.className,
        input
      });
      
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi chuyển hồ sơ miễn phí trạm nâm dan', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}
