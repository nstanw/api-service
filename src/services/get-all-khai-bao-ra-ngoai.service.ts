import { GetAllKhaiBaoRaNgoaiInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class GetAllKhaiBaoRaNgoaiService {
  private logger = new Logger();

  async getAllKhaiBaoRaNgoai(input: GetAllKhaiBaoRaNgoaiInput) {
    try {
      this.logger.debug('Calling GetAllKhaiBaoRaNgoai API', {
        url: CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.GET_ALL,
        input
      });

      // Tạo query parameters từ input
      const queryParams = new URLSearchParams();
      
      if (input.limit !== undefined) {
        queryParams.append('limit', input.limit.toString());
      }
      if (input.start !== undefined) {
        queryParams.append('start', input.start.toString());
      }
      if (input.filter) {
        queryParams.append('filter', input.filter);
      }
      if (input.q) {
        queryParams.append('q', input.q);
      }
      if (input.sort) {
        queryParams.append('sort', input.sort);
      }
      if (input.order) {
        queryParams.append('order', input.order);
      }
      if (input.after) {
        queryParams.append('after', input.after);
      }

      const queryString = queryParams.toString();
      const url = queryString ? 
        `${CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.GET_ALL}?${queryString}` : 
        CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.GET_ALL;
      
      const response = await ApiClient.get<any>(url);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed GetAllKhaiBaoRaNgoai', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in GetAllKhaiBaoRaNgoai', { error, input });
      throw error;
    }
  }
}
