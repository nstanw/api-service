import { UpdateHoaChatSXNInput } from '../types.js';
import { ApiClient, AbpResponse } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class HoaChatService {
  private logger = new Logger();

  async updateHoaChatSXN(input: UpdateHoaChatSXNInput) {
    try {
      this.logger.debug('Calling update hoa chat SXN API', {
        url: CONFIG.TOOLS.HOA_CHAT.UPDATE,
        input
      });
      
      const response = await ApiClient.put<any>(CONFIG.TOOLS.HOA_CHAT.UPDATE, input);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully updated hoa chat', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error updating hoa chat', { error, input });
      throw error;
    }
  }
}
