import { ApiClient } from '../utils/api-client.js';
import { DangKyNghiTuanInput } from '../types.js';

export class KhaiBaoNghiTuanService {
  async dangKyNghiTuan(params: DangKyNghiTuanInput) {
    const { manv, ngay } = params;
    return await ApiClient.post('/api/services/app/KhaiBaoNgayNghi/DangKyNghiTuan', null, {
      params: { manv, ngay }
    });
  }
}
