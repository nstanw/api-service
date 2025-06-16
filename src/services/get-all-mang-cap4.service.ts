import { GetAllMangCap4Input } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class GetAllMangCap4Service {
  private logger = new Logger();

  async getAllMangCap4(input: GetAllMangCap4Input) {
    try {
      this.logger.debug('Calling GetAllMangCap4 API', {
        url: CONFIG.TOOLS.MANG_CAP4.GET_ALL,
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
        `${CONFIG.TOOLS.MANG_CAP4.GET_ALL}?${queryString}` : 
        CONFIG.TOOLS.MANG_CAP4.GET_ALL;
      
      const response = await ApiClient.get<any>(url);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed GetAllMangCap4', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in GetAllMangCap4', { error, input });
      throw error;
    }
  }
}
