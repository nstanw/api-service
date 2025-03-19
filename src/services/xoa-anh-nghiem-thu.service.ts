import { XoaAnhNghiemThuInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class XoaAnhNghiemThuService {
  private logger = new Logger();

  async xoaAnhNghiemThu(input: XoaAnhNghiemThuInput) {
    try {
      this.logger.debug('Calling XoaAnhNghiemThu API', {
        url: CONFIG.TOOLS.XOA_ANT.ACTION,
        input
      });
      
      const response = await ApiClient.post<any>(CONFIG.TOOLS.XOA_ANT.ACTION, input);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed XoaAnhNghiemThu', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in XoaAnhNghiemThu', { error, input });
      throw error;
    }
  }
}
