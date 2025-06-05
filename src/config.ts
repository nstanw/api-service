const CONFIG = {
  API_BASE_URL: 'http://localhost:44311/',
  LOG_PATH: './logs',
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
      CHUYEN_HO_SO_MIEN_PHI_TRAM_NAM_DAN: '/api/services/app/QuyetToanMangCap4/ChuyenHoSoMienPhiTramNamDan'
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
      GET_ALL: '/api/services/app/KhaiBaoRaNgoai/GetAllViewKhaiBaoRaNgoais'
    }
  }
};

export { CONFIG };
