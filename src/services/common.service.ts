import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { BreakfastRegistration, GetAllKhaiBaoRaNgoaiInput, UpdateKhaiBaoRaNgoaiInput } from '../types.js';

export class CommonService {
  async checkConnection() {
    const response = await ApiClient.get(CONFIG.TOOLS.STATUS.CHECK);
    return response.result;
  }

  async registerBreakfast(params: BreakfastRegistration) {
    const response = await ApiClient.post(CONFIG.TOOLS.BREAKFAST.REGISTER, params);
    return response.result;
  }

  async getAllKhaiBaoRaNgoai(params?: GetAllKhaiBaoRaNgoaiInput) {
    const response = await ApiClient.get(CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.GET_ALL, { params });
    return response.result;
  }

  async updateKhaiBaoRaNgoai(params: UpdateKhaiBaoRaNgoaiInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.KHAI_BAO_RA_NGOAI.UPDATE, params);
    return response.result;
  }
}

export const commonService = new CommonService();
