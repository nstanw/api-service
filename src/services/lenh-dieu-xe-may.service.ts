// filepath: c:\Users\Administrator\Documents\Cline\MCP\mcp-call-api\src\services\lenh-dieu-xe-may.service.ts
import { UpdateLenhDieuXeMayInput, DeleteLenhDieuXeMayInput } from '../types.js';
import { ApiClient, AbpResponse } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class LenhDieuXeMayService {
  private logger = new Logger();

  private adjustTimezone(dateStr: string | undefined): string | undefined {
    if (!dateStr) return undefined;
    const date = new Date(dateStr.toString());
   // date.setUTCHours(date.getUTCHours() - 7);
    return date.toISOString();
  }

  async updateLenhDieuXeMay(input: UpdateLenhDieuXeMayInput) {
    try {
      // Adjust timezone +7 for both start and end times
      input.ThoiGianBatDau = this.adjustTimezone(input.ThoiGianBatDau);
      input.ThoiGianHoanThanh = this.adjustTimezone(input.ThoiGianHoanThanh);

      this.logger.debug('Calling update lenh dieu xe may API', {
        url: CONFIG.TOOLS.LENH_DIEU_XE_MAY.UPDATE,
        input
      });
      
      const response = await ApiClient.put<any>(CONFIG.TOOLS.LENH_DIEU_XE_MAY.UPDATE,null,{params: input});
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully updated lenh dieu xe may', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error updating lenh dieu xe may', { error, input });
      throw error;
    }
  }

  async deleteLenhDieuXeMay(input: DeleteLenhDieuXeMayInput) {
    try {
      this.logger.debug('Calling delete lenh dieu xe may API', {
        url: CONFIG.TOOLS.LENH_DIEU_XE_MAY.DELETE,
        input
      });
      
      const response = await ApiClient.delete<any>(CONFIG.TOOLS.LENH_DIEU_XE_MAY.DELETE, {
        params: input
      });
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully deleted lenh dieu xe may', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error deleting lenh dieu xe may', { error, input });
      throw error;
    }
  }
}
