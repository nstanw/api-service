// Tool type definition
export interface Tool {
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
}

// Tool definitions
export const tools: Record<string, Tool> = {
  check_connection: {
    description: 'Kiểm tra kết nối tới API server',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  search_employee: {
    description: 'Tìm kiếm nhân viên theo tên hoặc mã',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string', description: 'Từ khóa tìm kiếm (tên/mã nhân viên)' },
        limit: { type: 'number', description: 'Số lượng kết quả tối đa', default: 10 }
      },
      required: ['q']
    }
  },
  register_breakfast: {
    description: 'Đăng ký ăn sáng cho nhân viên',
    inputSchema: {
      type: 'object',
      properties: {
        maNhanVien: { type: 'string', description: 'Mã nhân viên' },
        thoiGian: { type: 'string', description: 'Thời gian đăng ký (ISO format)' },
        soLuongAnSang: { type: 'number', description: 'Số lượng suất ăn sáng', default: 1 },
        soLuongCafe: { type: 'number', description: 'Số lượng cafe', default: 0 },
        soLuongSuaChua: { type: 'number', description: 'Số lượng sữa chua', default: 0 }
      },
      required: ['maNhanVien', 'thoiGian']
    }
  },
  update_hoa_chat: {
    description: 'Cập nhật thông tin hóa chất theo ca',
    inputSchema: {
      type: 'object',
      properties: {
        ngay: { type: 'string', description: 'Ngày (ISO format)' },
        ca: { type: 'number', description: 'Ca làm việc' },
        hV_Voi: { type: 'number', description: 'HV Vôi' },
        hV_Clo: { type: 'number', description: 'HV Clo' },
        hV_PAC: { type: 'number', description: 'HV PAC' },
        cB_Voi: { type: 'number', description: 'CB Vôi' },
        cB_Clo: { type: 'number', description: 'CB Clo' },
        cB_PAC: { type: 'number', description: 'CB PAC' },
        hN_Voi: { type: 'number', description: 'HN Vôi' },
        hN_Clo: { type: 'number', description: 'HN Clo' },
        hN_PAC: { type: 'number', description: 'HN PAC' }
      },
      required: ['ngay', 'ca']
    }
  },
  xoa_anh_nghiem_thu: {
    description: 'Xóa Ảnh nghiệm thu theo yêu cầu',
    inputSchema: {
      type: 'object',
      properties: {
        resourceId: { type: 'string', description: 'ID của resource cần xóa (UUID)' }
      },
      required: ['resourceId']
    }
  },
  update_lenh_dieu_xe_may: {
    description: 'Cập nhật thông tin lệnh điều xe máy',
    inputSchema: {
      type: 'object',
      properties: {
        Code: { type: 'string', description: 'Mã lệnh điều xe' },
        ViTriBatDau: { type: 'string', description: 'Vị trí bắt đầu' },
        ViTriHoanThanh: { type: 'string', description: 'Vị trí hoàn thành' },
        ChiSoDongHoCongToMetBatDau: { type: 'number', description: 'Chỉ số đồng hồ công tơ mét bắt đầu' },
        ChiSoDongHoCongToMetHoanThanh: { type: 'number', description: 'Chỉ số đồng hồ công tơ mét hoàn thành' },
        ThoiGianBatDau: { type: 'string', description: 'Thời gian bắt đầu (ISO format)' },
        ThoiGianHoanThanh: { type: 'string', description: 'Thời gian hoàn thành (ISO format)' }
      },
      required: ['Code']
    }
  },
  chuyen_nhan_vien_thi_cong: {
    description: 'Chuyển nhân viên thi công giao khoán',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Mã công trình' },
        nhanVienThiCong: { type: 'string', description: 'Mã nhân viên thi công' }
      },
      required: ['code', 'nhanVienThiCong']
    }
  },
  phan_cong_nhan_vien_ky_thuat: {
    description: 'Phân công nhân viên kỹ thuật',
    inputSchema: {
      type: 'object', 
      properties: {
        maddk: { type: 'string', description: 'Mã đăng ký' },
        maNhanVien: { type: 'string', description: 'Mã nhân viên' }
      },
      required: ['maddk', 'maNhanVien']
    }
  },
  delete_lenh_dieu_xe_may: {
    description: 'Xóa lệnh điều xe máy',
    inputSchema: {
      type: 'object',
      properties: {
        Code: { type: 'string', description: 'Mã lệnh điều xe' }
      },
      required: ['Code']
    }
  },
  mo_in_lai_phieu_xuat_kho_vat_tu: {
    description: 'Mở in lại phiếu xuất kho vật tư',
    inputSchema: {
      type: 'object',
      properties: {
        soPhieuXuatKho: { type: 'string', description: 'Số phiếu xuất kho' },
        nam: { type: 'number', description: 'Năm của phiếu xuất kho' }
      },
      required: ['soPhieuXuatKho', 'nam']
    }
  },
  add_nha_san_xuat: {
    description: 'Thêm nhà sản xuất mới',
    inputSchema: {
      type: 'object',
      properties: {
        tenNhaSanXuat: { type: 'string', description: 'Tên nhà sản xuất' }
      },
      required: ['tenNhaSanXuat']
    }
  },
  them_nhan_vien_sxn: {
    description: 'Thêm nhân viên công việc SXN',
    inputSchema: {
      type: 'object',
      properties: {
        maNhanVien: { type: 'string', description: 'Mã nhân viên' },
        congViec: { type: 'string', description: 'Công việc' },
        nhomCaTruc: { type: 'number', description: 'Nhóm ca trực' },
        diaDiem: { type: 'string', description: 'Địa điểm' }
      },
      required: ['maNhanVien', 'congViec', 'nhomCaTruc', 'diaDiem']
    }
  },
  chuyen_nhan_vien_ky_thuat_giao_khoan: {
    description: 'Chuyển nhân viên kỹ thuật giao khoán',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Mã công trình' },
        maNhanVienKyThuat: { type: 'string', description: 'Mã nhân viên kỹ thuật' }
      },
      required: ['code', 'maNhanVienKyThuat']
    }
  },
  get_lenh_dieu_xe_may: {
    description: 'Lấy thông tin lệnh điều xe máy',
    inputSchema: {
      type: 'object',
      properties: {
        Code: { type: 'string', description: 'Mã lệnh điều xe' }
      },
      required: ['Code']
    }
  },
  phan_cong_nhan_vien_thi_cong: {
    description: 'Phân công nhân viên thi công',
    inputSchema: {
      type: 'object',
      properties: {
        maddk: { type: 'string', description: 'Mã đăng ký' },
        maNhanVien: { type: 'string', description: 'Mã nhân viên' }
      },
      required: ['maddk', 'maNhanVien']
    }
  },
  update_ton_kho_so_sach: {
    description: 'Cập nhật tồn kho sổ sách',
    inputSchema: {
      type: 'object',
      properties: {
        maKhoVatTu: { type: 'number', description: 'Mã kho vật tư' },
        maVatTuHangHoa: { type: 'number', description: 'Mã vật tư hàng hóa' },
        maNhaSanXuat: { type: 'number', description: 'Mã nhà sản xuất' },
        tonKhoSoSach: { type: 'number', description: 'Tồn kho sổ sách' }
      },
      required: ['maKhoVatTu','maVatTuHangHoa','maNhaSanXuat','tonKhoSoSach']
    }
  },
  update_ton_kho: {
    description: 'Cập nhật tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        maVatTuHangHoa: { type: 'number', description: 'Mã vật tư hàng hóa' },
        maNhaSanXuat: { type: 'number', description: 'Mã nhà sản xuất' },
        maKhoVatTu: { type: 'number', description: 'Mã kho vật tư' }
      },
      required: ['maVatTuHangHoa', 'maNhaSanXuat', 'maKhoVatTu']
    }
  },
  phan_cong_nhan_vien_thi_cong_list: {
    description: 'Phân công nhân viên thi công theo danh sách',
    inputSchema: {
      type: 'object',
      properties: {
        maNhanVien: { type: 'string', description: 'Mã nhân viên' },
        danhSachMa: {
          type: 'array',
          items: { type: 'string' },
          description: 'Danh sách mã cần phân công'
        }
      },
      required: ['maNhanVien', 'danhSachMa']
    }
  },
  chuyen_ho_so_mien_phi_tram_nam_dan: {
    description: 'Chuyển hồ sơ miễn phí trạm nâm dan',
    inputSchema: {
      type: 'object',
      properties: {
        danhSachMa: {
          type: 'array',
          items: { type: 'string' },
          description: 'Danh sách mã hồ sơ cần chuyển'
        }
      },
      required: ['danhSachMa']
    }
  },
  get_all_khai_bao_ra_ngoai: {
    description: 'Lấy danh sách tất cả khai báo ra ngoài',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Số lượng bản ghi tối đa' },
        start: { type: 'number', description: 'Vị trí bắt đầu' },
        filter: { type: 'string', description: 'Bộ lọc tìm kiếm' },
        q: { type: 'string', description: 'Từ khóa tìm kiếm' },
        sort: { type: 'string', description: 'Trường sắp xếp' },
        order: { type: 'string', description: 'Thứ tự sắp xếp (asc/desc)' },
        after: { type: 'string', description: 'Lấy dữ liệu sau marker này' }
      },
      required: []
    }
  },
  update_khai_bao_ra_ngoai: {
    description: 'Cập nhật khai báo ra ngoài',
    inputSchema: {
      type: 'object',
      properties: {
        khaiBaoID: { type: 'number', description: 'ID khai báo cần cập nhật' },
        tuNgay: { type: 'string', description: 'Thời gian bắt đầu (ISO format)' },
        denNgay: { type: 'string', description: 'Thời gian kết thúc (ISO format)' }
      },
      required: ['khaiBaoID', 'tuNgay', 'denNgay']
    }
  }
};
