import { GetLenhDieuXeMayInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class GetLenhDieuXeMayService {
  private logger = new Logger();

  async getLenhDieuXeMay(input: GetLenhDieuXeMayInput) {
    try {
      this.logger.debug('Calling get lenh dieu xe may API', {
        url: CONFIG.TOOLS.TUANANH.GET_LENH_DIEU_XE_MAY,
        input
      });
      
      const response = await ApiClient.get<any>(
        CONFIG.TOOLS.TUANANH.GET_LENH_DIEU_XE_MAY,
        { params: input }
      );
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully retrieved lenh dieu xe may', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error retrieving lenh dieu xe may', { error, input });
      throw error;
    }
  }
}
