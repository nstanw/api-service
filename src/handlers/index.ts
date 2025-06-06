import {
  employeeService,
  vehicleService,
  inventoryService,
  documentService,
  commonService,
  chemicalService
} from '../services/index.js';

type ApiResult = {
  content: Array<{ type: string; text: string }>;
};

const createResponse = (content: string): ApiResult => ({
  content: [{ type: 'text', text: content }]
});

async function handleApiCall<T>(
  action: () => Promise<T>,
  requiredParams: Record<string, any> = {},
  errorMessage: string
): Promise<ApiResult> {
  const missingParams = Object.entries(requiredParams)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingParams.length > 0) {
    return createResponse(`Thiếu tham số bắt buộc (${missingParams.join(', ')})`);
  }

  try {
    const result = await action();
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    return createResponse(errorMessage);
  }
}

// Common handlers
export const commonHandlers = {
  checkConnection: () => handleApiCall(
    () => commonService.checkConnection(),
    {},
    'Không thể kết nối tới API server'
  ),

  registerBreakfast: (args: any) => {
    const params = {
      maNhanVien: String(args.maNhanVien || ''),
      thoiGian: String(args.thoiGian || ''),
      soLuongDangKyAnSang: 1,
      soLuongDangKyUongCafe: 0,
      soLuongDangKySuaChua: 0,
      tuDongDangKy: false,
      ngoaiTru: 0
    };
    return handleApiCall(
      () => commonService.registerBreakfast(params),
      { maNhanVien: params.maNhanVien, thoiGian: params.thoiGian },
      'Có lỗi xảy ra khi đăng ký ăn sáng'
    );
  },

  getAllKhaiBaoRaNgoai: (args: any) => {
    const params = {
      limit: args.limit !== undefined ? Number(args.limit) : undefined,
      start: args.start !== undefined ? Number(args.start) : undefined,
      filter: args.filter ? String(args.filter) : undefined,
      q: args.q ? String(args.q) : undefined,
      sort: args.sort ? String(args.sort) : undefined,
      order: args.order ? String(args.order) : undefined,
      after: args.after ? String(args.after) : undefined
    };
    return handleApiCall(
      () => commonService.getAllKhaiBaoRaNgoai(params),
      {},
      'Lỗi khi lấy danh sách khai báo ra ngoài'
    );
  },

  updateKhaiBaoRaNgoai: (args: any) => {
    const params = {
      khaiBaoID: Number(args.khaiBaoID || 0),
      tuNgay: String(args.tuNgay || ''),
      denNgay: String(args.denNgay || '')
    };
    return handleApiCall(
      () => commonService.updateKhaiBaoRaNgoai(params),      params,      'Lỗi khi cập nhật khai báo ra ngoài'    );
  }
};

// Employee handlers
export const employeeHandlers = {
  search: (args: any) => {
    const params = {
      q: String(args.q || ''),
      limit: Number(args.limit || 10)
    };
    return handleApiCall(
      () => employeeService.search(params),
      { q: params.q },
      'Có lỗi xảy ra khi tìm kiếm nhân viên'
    );
  },

  transferConstructionStaff: (args: any) => {
    const params = {
      code: String(args.code || ''),
      nhanVienThiCong: String(args.nhanVienThiCong || '')
    };
    return handleApiCall(
      () => employeeService.transferConstructionStaff(params),
      params,
      'Có lỗi xảy ra khi chuyển nhân viên thi công'
    );
  },

  assignTechnicalStaff: (args: any) => {
    const params = {
      maddk: String(args.maddk || ''),
      maNhanVien: String(args.maNhanVien || '')
    };
    return handleApiCall(
      () => employeeService.assignTechnicalStaff(params),
      params,
      'Có lỗi xảy ra khi phân công nhân viên kỹ thuật'
    );
  },

  addSXNStaff: (args: any) => {
    const params = {
      maNhanVien: String(args.maNhanVien || ''),
      congViec: String(args.congViec || ''),
      nhomCaTruc: Number(args.nhomCaTruc || 0),
      diaDiem: String(args.diaDiem || '')
    };
    return handleApiCall(
      () => employeeService.addSXNStaff(params),
      params,
      'Có lỗi xảy ra khi thêm nhân viên công việc SXN'
    );
  },

  transferTechnicalStaff: (args: any) => {
    const params = {
      code: String(args.code || ''),
      maNhanVienKyThuat: String(args.maNhanVienKyThuat || '')
    };
    return handleApiCall(
      () => employeeService.transferTechnicalStaff(params),
      params,
      'Có lỗi xảy ra khi chuyển nhân viên kỹ thuật giao khoán'
    );
  },

  assignConstructionStaff: (args: any) => {
    const params = {
      maddk: String(args.maddk || ''),
      maNhanVien: String(args.maNhanVien || '')
    };
    return handleApiCall(
      () => employeeService.assignConstructionStaff(params),
      params,
      'Có lỗi xảy ra khi phân công nhân viên thi công'
    );
  },

  assignConstructionStaffList: (args: any) => {
    const params = {
      maNhanVien: String(args.maNhanVien || ''),
      danhSachMa: Array.isArray(args.danhSachMa) ? args.danhSachMa : []
    };
    return handleApiCall(
      () => employeeService.assignConstructionStaffList(params),
      { maNhanVien: params.maNhanVien, 'danhSachMa.length': params.danhSachMa.length },
      'Lỗi khi phân công nhân viên thi công list'
    );
  }
};

// Vehicle handlers
export const vehicleHandlers = {
  updateLenhDieuXeMay: (args: any) => {
    const params = {
      Code: String(args.Code || ''),
      ViTriBatDau: args.ViTriBatDau ? String(args.ViTriBatDau) : undefined,
      ViTriHoanThanh: args.ViTriHoanThanh ? String(args.ViTriHoanThanh) : undefined,
      ChiSoDongHoCongToMetBatDau: args.ChiSoDongHoCongToMetBatDau !== undefined ? Number(args.ChiSoDongHoCongToMetBatDau) : undefined,
      ChiSoDongHoCongToMetHoanThanh: args.ChiSoDongHoCongToMetHoanThanh !== undefined ? Number(args.ChiSoDongHoCongToMetHoanThanh) : undefined,
      ThoiGianBatDau: args.ThoiGianBatDau ? String(args.ThoiGianBatDau) : undefined,
      ThoiGianHoanThanh: args.ThoiGianHoanThanh ? String(args.ThoiGianHoanThanh) : undefined
    };
    return handleApiCall(
      () => vehicleService.updateLenhDieuXeMay(params),
      { Code: params.Code },
      'Có lỗi xảy ra khi cập nhật lệnh điều xe máy'
    );
  },

  deleteLenhDieuXeMay: (args: any) => {
    const params = { Code: String(args.Code || '') };
    return handleApiCall(
      () => vehicleService.deleteLenhDieuXeMay(params),
      params,
      'Có lỗi xảy ra khi xóa lệnh điều xe máy'
    );
  },

  getLenhDieuXeMay: (args: any) => {
    const params = { Code: String(args.Code || '') };
    return handleApiCall(
      () => vehicleService.getLenhDieuXeMay(params),
      params,
      'Có lỗi xảy ra khi lấy thông tin lệnh điều xe máy'
    );
  }
};

// Inventory handlers
export const inventoryHandlers = {
  moInLaiPhieuXuatKho: (args: any) => {
    const params = {
      soPhieuXuatKho: String(args.soPhieuXuatKho || ''),
      nam: Number(args.nam || 0)
    };
    return handleApiCall(
      () => inventoryService.moInLaiPhieuXuatKho(params),
      params,
      'Có lỗi xảy ra khi mở in lại phiếu xuất kho vật tư'
    );
  },

  addNhaSanXuat: (args: any) => {
    const params = { tenNhaSanXuat: String(args.tenNhaSanXuat || '') };
    return handleApiCall(
      () => inventoryService.addNhaSanXuat(params),
      params,
      'Có lỗi xảy ra khi thêm nhà sản xuất'
    );
  },

  updateTonKho: (args: any) => {
    const params = {
      maVatTuHangHoa: Number(args.maVatTuHangHoa),
      maNhaSanXuat: Number(args.maNhaSanXuat),
      maKhoVatTu: Number(args.maKhoVatTu)
    };
    return handleApiCall(
      () => inventoryService.updateTonKho(params),
      params,
      'Lỗi khi cập nhật tồn kho'
    );
  },

  updateTonKhoSoSach: (args: any) => {
    const params = {
      maKhoVatTu: Number(args.maKhoVatTu),
      maVatTuHangHoa: Number(args.maVatTuHangHoa),
      maNhaSanXuat: Number(args.maNhaSanXuat),
      tonKhoSoSach: Number(args.tonKhoSoSach)
    };
    return handleApiCall(
      () => inventoryService.updateTonKhoSoSach(params),
      params,
      'Lỗi khi cập nhật tồn kho sổ sách'
    );
  }
};

// Document handlers
export const documentHandlers = {
  xoaAnhNghiemThu: (args: any) => {
    const params = { ResourceId: String(args.resourceId || '') };
    return handleApiCall(
      () => documentService.xoaAnhNghiemThu(params),
      { ResourceId: params.ResourceId },
      'Có lỗi xảy ra khi xóa ảnh nghiệm thu'
    );
  },

  chuyenHoSoMienPhiTramNamDan: (args: any) => {
    const params = {
      danhSachMa: Array.isArray(args.danhSachMa) ? args.danhSachMa : []
    };
    return handleApiCall(
      () => documentService.chuyenHoSoMienPhiTramNamDan(params),
      { 'danhSachMa.length': params.danhSachMa.length },
      'Lỗi khi chuyển hồ sơ miễn phí trạm nâm dan'
    );
  }
};

// Chemical handlers
export const chemicalHandlers = {
  updateHoaChatSXN: (args: any) => {
    const params = {
      ngay: String(args.ngay || ''),
      ca: Number(args.ca || 0),
      hV_Voi: Number(args.hV_Voi),
      hV_Clo: Number(args.hV_Clo),
      hV_PAC: Number(args.hV_PAC),
      cB_Voi: Number(args.cB_Voi),
      cB_Clo: Number(args.cB_Clo),
      cB_PAC: Number(args.cB_PAC),
      hN_Voi: Number(args.hN_Voi),
      hN_Clo: Number(args.hN_Clo),
      hN_PAC: Number(args.hN_PAC)
    };
    return handleApiCall(
      () => chemicalService.updateHoaChatSXN(params),
      { ngay: params.ngay, ca: params.ca },
      'Có lỗi xảy ra khi cập nhật hóa chất'
    );
  }
};
