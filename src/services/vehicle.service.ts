import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { UpdateLenhDieuXeMayInput, DeleteLenhDieuXeMayInput, GetLenhDieuXeMayInput } from '../types.js';

export class VehicleService {
  async getLenhDieuXeMay(params: GetLenhDieuXeMayInput) {
    const response = await ApiClient.get(CONFIG.TOOLS.TUANANH.GET_LENH_DIEU_XE_MAY, { params });
    return response.result;
  }

  async updateLenhDieuXeMay(params: UpdateLenhDieuXeMayInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.LENH_DIEU_XE_MAY.UPDATE, params);
    return response.result;
  }

  async deleteLenhDieuXeMay(params: DeleteLenhDieuXeMayInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.LENH_DIEU_XE_MAY.DELETE, params);
    return response.result;
  }
}

export const vehicleService = new VehicleService();
