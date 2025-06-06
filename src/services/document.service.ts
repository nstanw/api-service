import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { XoaAnhNghiemThuInput } from '../types.js';

export class DocumentService {
  async xoaAnhNghiemThu(params: XoaAnhNghiemThuInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.XOA_ANT.ACTION, params);
    return response.result;
  }

  async chuyenHoSoMienPhiTramNamDan(params: { danhSachMa: string[] }) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.CHUYEN_HO_SO_MIEN_PHI_TRAM_NAM_DAN, params);
    return response.result;
  }
}

export const documentService = new DocumentService();
