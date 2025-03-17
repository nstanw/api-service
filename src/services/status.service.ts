import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class StatusService {
  private logger = new Logger();

  async checkConnection() {
    try {
      this.logger.debug('Checking API connection...');
      const response = await ApiClient.get(CONFIG.TOOLS.STATUS.CHECK);
      this.logger.debug('API connection successful', { response });
      return response.result;
    } catch (error: any) {
      this.logger.error('API connection failed', {
        error: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      throw error;
    }
  }
}
