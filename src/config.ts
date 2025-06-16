import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://localhost:44311/',
  // API_BASE_URL: process.env.API_BASE_URL || 'http://118.70.151.182:1223/',

  LOG_PATH: process.env.LOG_PATH || './logs',
  NODE_ENV: process.env.NODE_ENV || 'development',
  TOOLS: {
    STATUS: {
      CHECK: '/api/services/app/Session/GetCurrentLoginInformations'
    },
    EMPLOYEE: {
      GET_ALL: '/api/services/app/NhanVien/GetAll',
      GET_BY_ID: '/api/services/app/NhanVien/Get'
    },
    BREAKFAST: {
      REGISTER: '/api/services/app/AnSang/DangKyAnSang2'
    },
    HOA_CHAT: {
      UPDATE: '/api/services/app/TuanAnhAppServices/UpdateHoaChatSXN'
    },
    XOA_ANT: {
      ACTION: '/api/services/app/TuanAnhAppServices/XoaAnhNghiemThu'
    },
    LENH_DIEU_XE_MAY: {
      UPDATE: '/api/services/app/TuanAnhAppServices/UpdateLenhDieuXeMay',
      DELETE: '/api/services/app/TuanAnhAppServices/DeleteLenhDieuXeMay'
    },
    TUANANH: {
      CHUYEN_NHAN_VIEN_THI_CONG: '/api/services/app/TuanAnhAppServices/ChuyenNhanVienThiCongGiaoKhoan',
      PHAN_CONG_NHAN_VIEN_KY_THUAT: '/api/services/app/MangCap4/PhanCongNhanVienKyThuat',
      MO_IN_LAI_PHIEU_XUAT_KHO: '/api/services/app/TuanAnhAppServices/MoInLaiPhieuXuatKhoVatTu',
      UPDATE_TTHS_MANG_CAP4: '/api/services/app/TuanAnhAppServices/UpdateTTHSMangCap4',
      THEM_NHAN_VIEN_SXN: '/api/services/app/TuanAnhAppServices/ThemNhanVienCongViecSXN',
      CHUYEN_NHAN_VIEN_KY_THUAT_GIAO_KHOAN: '/api/services/app/TuanAnhAppServices/ChuyenNhanVienKyThuatGiaoKhoan',
      GET_LENH_DIEU_XE_MAY: '/api/services/app/TuanAnhAppServices/GetLenhDieuXeMay',
      PHAN_CONG_NHAN_VIEN_THI_CONG: '/api/services/app/MangCap4/PhanCongNhanVienThiCong',
      PHAN_CONG_NHAN_VIEN_THI_CONG_LIST: '/api/services/app/TuanAnhAppServices/PhanCongNhanVienThiCongList',
      CHUYEN_HO_SO_MIEN_PHI_TRAM_NAM_DAN: '/api/services/app/QuyetToanMangCap4/ChuyenHoSoMienPhiTramNamDan',
      DANG_KY_DIEU_DONG: '/api/services/app/TuanAnhAppServices/DangKyDieuDong'
    },
    NHA_SAN_XUAT: {
      ADD: '/api/services/app/NhaSanXuat/AddNhaSanXuat'
    },
    TON_KHO_HIEN_TAI: {
      UPDATE_TON_KHO_SO_SACH: '/api/services/app/TonKhoHienTai/UpdateTonKhoSoSach'
    },
    TON_KHO: {
      UPDATE: '/api/services/app/TonKho/UpdateTonKho'
    },
    KHAI_BAO_RA_NGOAI: {
      GET_ALL: '/api/services/app/KhaiBaoRaNgoai/GetAllViewKhaiBaoRaNgoais',
      UPDATE: '/api/services/app/TuanAnhAppServices/UpdateKhaiBaoRaNgoai'
    },
    DUONG_PHO: {
      GET_ALL: '/api/services/app/DuongPhoLD/GetAll',
      ADD: '/api/services/app/DuongPhoLD/AddDuongPhoLD'
    },
    NGAN_HANG: {
      THANH_TOAN_THEO_KY: '/api/services/app/NganHang/ThanhToanTheoKy'
    },
    MANG_CAP4: {
      GET_ALL: '/api/services/app/MangCap4/GetAll'
    }
  }
};

export { CONFIG };
