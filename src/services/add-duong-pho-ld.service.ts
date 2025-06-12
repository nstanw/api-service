import { AddDuongPhoLDInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class AddDuongPhoLDService {
  private logger = new Logger();

  async addDuongPhoLD(input: AddDuongPhoLDInput) {
    try {
      this.logger.debug('Calling AddDuongPhoLD API', {
        url: CONFIG.TOOLS.DUONG_PHO.ADD,
        input
      });

      // Tạo query parameters từ input
      const queryParams = new URLSearchParams();
      
      queryParams.append('madpld', input.madpld);
      queryParams.append('tenduongld', input.tenduongld);
      
      if (input.maphuong) {
        queryParams.append('maphuong', input.maphuong);
      }

      const queryString = queryParams.toString();
      const url = `${CONFIG.TOOLS.DUONG_PHO.ADD}?${queryString}`;
      
      const response = await ApiClient.post<any>(url);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed AddDuongPhoLD', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in AddDuongPhoLD', { error, input });
      throw error;
    }
  }
}
