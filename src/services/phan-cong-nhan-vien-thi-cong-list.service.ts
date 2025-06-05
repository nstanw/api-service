import { CONFIG } from '../config.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { PhanCongNhanVienThiCongListInput } from '../types.js';

export class PhanCongNhanVienThiCongListService {
  private logger: Logger;
  private readonly className = 'PhanCongNhanVienThiCongListService';

  constructor() {
    this.logger = new Logger();
  }

  async phanCongNhanVienThiCongList(input: PhanCongNhanVienThiCongListInput) {
    try {
      this.logger.debug('Gọi API PhanCongNhanVienThiCongList', {
        className: this.className,
        url: CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG_LIST,
        input
      });

      // POST với query param và body
      const response = await ApiClient.post(
        CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG_LIST,
        input.danhSachMa, // Array body
        { params: { maNhanVien: input.maNhanVien } } // Query param
      );

      this.logger.info('Phân công nhân viên thi công list thành công', {
        className: this.className,
        input
      });
      
      return response.result;
    } catch (error) {
      this.logger.error('Lỗi khi phân công nhân viên thi công list', {
        className: this.className,
        error,
        input
      });
      throw error;
    }
  }
}
