export interface UpdateHoaChatSXNInput {
  ngay: string;
  ca: number;
  hV_Voi?: number;
  hV_Clo?: number; 
  hV_PAC?: number;
  cB_Voi?: number;
  cB_Clo?: number;
  cB_PAC?: number;
  hN_Voi?: number;
  hN_Clo?: number;
  hN_PAC?: number;
}
export interface Employee {
  id: string;
  name: string;
  code: string;
}

export interface SearchParams {
  q?: string;
  limit?: number;
}

export interface ApiResponse<T> {
  result: T;
  targetUrl: string | null;
  success: boolean;
  error: any | null;
  unAuthorizedRequest: boolean;
}

export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
}

export type AbpPagedResponse<T> = ApiResponse<PagedResultDto<T>>;

export interface XoaAnhNghiemThuInput {
  ResourceId: string;
}

export interface BreakfastRegistration {
  maNhanVien: string;
  thoiGian: string;
  soLuongDangKyAnSang: number;
  soLuongDangKyUongCafe?: number;
  soLuongDangKySuaChua?: number;
  soLuongDangKyUongCafeTuDong?: number;
  soLuongDangKySuaChuaTuDong?: number;
  tuDongDangKy?: boolean;
  ngoaiTru?: number;
}

export interface UpdateLenhDieuXeMayInput {
  Code: string;
  ViTriBatDau?: string;
  ViTriHoanThanh?: string;
  ChiSoDongHoCongToMetBatDau?: number;
  ChiSoDongHoCongToMetHoanThanh?: number;
  ThoiGianBatDau?: string;
  ThoiGianHoanThanh?: string;
}

export interface ChuyenNhanVienThiCongGiaoKhoanInput {
  code: string;
  nhanVienThiCong: string;
}

export interface PhanCongNhanVienKyThuatInput {
  maddk: string;
  maNhanVien: string;
}

export interface DeleteLenhDieuXeMayInput {
  Code: string;
}

export interface MoInLaiPhieuXuatKhoVatTuInput {
  soPhieuXuatKho: string;
  nam: number;
}

export interface ThemNhanVienCongViecSXNInput {
  maNhanVien: string;
  congViec: string;
  nhomCaTruc: number;
  diaDiem: string;
}

export interface AddNhaSanXuatInput {
  tenNhaSanXuat: string;
}
