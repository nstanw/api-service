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

export interface UpdateTTHSInput {
  maddk: string;
  newTTHS: string;
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

export interface ChuyenNhanVienKyThuatGiaoKhoanInput {
  code: string;
  maNhanVienKyThuat: string;
}

export interface GetLenhDieuXeMayInput {
  Code: string;
}

export interface PhanCongNhanVienThiCongInput {
  maddk: string;
  maNhanVien: string;
}

export interface UpdateTonKhoInput {
  maVatTuHangHoa: number;
  maNhaSanXuat: number;
  maKhoVatTu: number;
}

export interface UpdateTonKhoSoSachInput {
  maKhoVatTu: number;
  maVatTuHangHoa: number;
  maNhaSanXuat: number;
  tonKhoSoSach: number;
}

export interface PhanCongNhanVienThiCongListInput {
  maNhanVien: string;      // Query parameter
  danhSachMa: string[];    // Request body array
}

export interface ChuyenHoSoMienPhiTramNamDanInput {
  danhSachMa: string[];    // Request body array
}

export interface GetAllKhaiBaoRaNgoaiInput {
  limit?: number;
  start?: number;
  filter?: string;
  q?: string;
  sort?: string;
  order?: string;
  after?: string;
}
