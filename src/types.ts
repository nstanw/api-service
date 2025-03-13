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
