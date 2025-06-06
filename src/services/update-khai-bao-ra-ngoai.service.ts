import { UpdateKhaiBaoRaNgoaiInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class UpdateKhaiBaoRaNgoaiService {
  private logger = new Logger();

  async updateKhaiBaoRaNgoai(input: UpdateKhaiBaoRaNgoaiInput) {
    try {
      this.logger.debug('Calling UpdateKhaiBaoRaNgoai API', {
        url: CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.UPDATE,
        input
      });
      
      const queryParams = new URLSearchParams();
      queryParams.append('khaiBaoID', input.khaiBaoID.toString());
      queryParams.append('tuNgay', input.tuNgay);
      queryParams.append('denNgay', input.denNgay);

      const url = `${CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.UPDATE}?${queryParams}`;
      
      const response = await ApiClient.put<any>(url);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed UpdateKhaiBaoRaNgoai', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in UpdateKhaiBaoRaNgoai', { error, input });
      throw error;
    }
  }
}
