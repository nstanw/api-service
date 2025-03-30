const CONFIG = {
  API_BASE_URL: 'https://localhost:44311',
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
      MO_IN_LAI_PHIEU_XUAT_KHO: '/api/services/app/TuanAnhAppServices/MoInLaiPhieuXuatKhoVatTu'
    }
  }
};

export { CONFIG };
