import { ApiClient } from '../utils/api-client.js';
import { InputThanhToanTheoKy } from '../types.js';

export class ThanhToanTheoKyService {
  async thanhToanTheoKy(input: InputThanhToanTheoKy) {
    return ApiClient.post('/api/services/app/NganHang/ThanhToanTheoKy', input);
  }
}
