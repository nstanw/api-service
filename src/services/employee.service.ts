import { ApiClient, AbpResponse } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { Employee, SearchParams, PhanCongNhanVienKyThuatInput, PhanCongNhanVienThiCongInput, ChuyenNhanVienThiCongGiaoKhoanInput, ChuyenNhanVienKyThuatGiaoKhoanInput, ThemNhanVienCongViecSXNInput } from '../types.js';

export class EmployeeService {
  async search(params: SearchParams) {
    const response = await ApiClient.get<Employee[]>(CONFIG.TOOLS.EMPLOYEE.GET_ALL, {
      params
    });
    return response.result;
  }

  async assignTechnicalStaff(params: PhanCongNhanVienKyThuatInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_KY_THUAT, params);
    return response.result;
  }

  async assignConstructionStaff(params: PhanCongNhanVienThiCongInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG, params);
    return response.result;
  }

  async assignConstructionStaffList(params: { maNhanVien: string, danhSachMa: string[] }) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.PHAN_CONG_NHAN_VIEN_THI_CONG_LIST, params);
    return response.result;
  }

  async transferConstructionStaff(params: ChuyenNhanVienThiCongGiaoKhoanInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_THI_CONG, params);
    return response.result;
  }

  async transferTechnicalStaff(params: ChuyenNhanVienKyThuatGiaoKhoanInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.CHUYEN_NHAN_VIEN_KY_THUAT_GIAO_KHOAN, params);
    return response.result;
  }

  async addSXNStaff(params: ThemNhanVienCongViecSXNInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.THEM_NHAN_VIEN_SXN, params);
    return response.result;
  }
}

export const employeeService = new EmployeeService();
