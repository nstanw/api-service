import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { UpdateTonKhoInput, UpdateTonKhoSoSachInput, MoInLaiPhieuXuatKhoVatTuInput, AddNhaSanXuatInput } from '../types.js';

export class InventoryService {
  async updateTonKho(params: UpdateTonKhoInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TON_KHO.UPDATE, params);
    return response.result;
  }

  async updateTonKhoSoSach(params: UpdateTonKhoSoSachInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TON_KHO_HIEN_TAI.UPDATE_TON_KHO_SO_SACH, params);
    return response.result;
  }

  async moInLaiPhieuXuatKho(params: MoInLaiPhieuXuatKhoVatTuInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.MO_IN_LAI_PHIEU_XUAT_KHO, params);
    return response.result;
  }

  async addNhaSanXuat(params: AddNhaSanXuatInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.NHA_SAN_XUAT.ADD, params);
    return response.result;
  }
}

export const inventoryService = new InventoryService();
