#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { employeeService, breakfastService, HoaChatService, StatusService, XoaAnhNghiemThuService, LenhDieuXeMayService, ChuyenNhanVienThiCongGiaoKhoanService, PhanCongNhanVienKyThuatService, MoInLaiPhieuXuatKhoService, AddNhaSanXuatService, ThemNhanVienSXNService, UpdateTTHSMangCap4Service, ChuyenNhanVienKyThuatGiaoKhoanService, GetLenhDieuXeMayService, PhanCongNhanVienThiCongService, PhanCongNhanVienThiCongListService, ChuyenHoSoMienPhiTramNamDanService, UpdateTonKhoSoSachService, UpdateTonKhoService, UpdateNhanVienChucVuService, GetAllKhaiBaoRaNgoaiService, UpdateKhaiBaoRaNgoaiService, GetAllDuongPhoLDService, AddDuongPhoLDService, ThanhToanTheoKyService, dangKyDieuDongService, GetAllMangCap4Service, KhaiBaoNghiTuanService, GetAllPhuongService } from './services/index.js';
import { Logger } from './utils/logger.js';

interface Tool {
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
}

class ApiServer {
  private server: Server;
  private logger: Logger;
  private tools: Record<string, Tool>;
  private hoaChatService: HoaChatService;
  private statusService: StatusService;
  private xoaAnhNghiemThuService: XoaAnhNghiemThuService;
  private lenhDieuXeMayService: LenhDieuXeMayService;
  private chuyenNhanVienThiCongGiaoKhoanService: ChuyenNhanVienThiCongGiaoKhoanService;
  private phanCongNhanVienKyThuatService: PhanCongNhanVienKyThuatService;
  private moInLaiPhieuXuatKhoService: MoInLaiPhieuXuatKhoService;
  private addNhaSanXuatService: AddNhaSanXuatService;
  private updateTTHSMangCap4Service: UpdateTTHSMangCap4Service;
  private themNhanVienSXNService: ThemNhanVienSXNService;
  private chuyenNhanVienKyThuatGiaoKhoanService: ChuyenNhanVienKyThuatGiaoKhoanService;
  private getLenhDieuXeMayService: GetLenhDieuXeMayService;
  private phanCongNhanVienThiCongService: PhanCongNhanVienThiCongService;
  private phanCongNhanVienThiCongListService: PhanCongNhanVienThiCongListService;
  private chuyenHoSoMienPhiTramNamDanService: ChuyenHoSoMienPhiTramNamDanService;
  private updateTonKhoSoSachService: UpdateTonKhoSoSachService;
  private updateTonKhoService: UpdateTonKhoService;
  private updateNhanVienChucVuService: UpdateNhanVienChucVuService;
  private getAllKhaiBaoRaNgoaiService: GetAllKhaiBaoRaNgoaiService;
  private updateKhaiBaoRaNgoaiService: UpdateKhaiBaoRaNgoaiService;
  private getAllDuongPhoLDService: GetAllDuongPhoLDService;
  private addDuongPhoLDService: AddDuongPhoLDService;
  private thanhToanTheoKyService: ThanhToanTheoKyService;
  private dangKyDieuDongService: typeof dangKyDieuDongService;
  private getAllMangCap4Service: GetAllMangCap4Service;
  private khaiBaoNghiTuanService: KhaiBaoNghiTuanService;
  private getAllPhuongService: GetAllPhuongService;

  constructor() {
    this.hoaChatService = new HoaChatService();
    this.statusService = new StatusService();
    this.xoaAnhNghiemThuService = new XoaAnhNghiemThuService();
    this.lenhDieuXeMayService = new LenhDieuXeMayService();
    this.chuyenNhanVienThiCongGiaoKhoanService = new ChuyenNhanVienThiCongGiaoKhoanService();
    this.phanCongNhanVienKyThuatService = new PhanCongNhanVienKyThuatService();
    this.moInLaiPhieuXuatKhoService = new MoInLaiPhieuXuatKhoService();
    this.addNhaSanXuatService = new AddNhaSanXuatService();
    this.themNhanVienSXNService = new ThemNhanVienSXNService();
    this.updateTTHSMangCap4Service = new UpdateTTHSMangCap4Service();
    this.chuyenNhanVienKyThuatGiaoKhoanService = new ChuyenNhanVienKyThuatGiaoKhoanService();
    this.getLenhDieuXeMayService = new GetLenhDieuXeMayService();
    this.phanCongNhanVienThiCongService = new PhanCongNhanVienThiCongService();
    this.phanCongNhanVienThiCongListService = new PhanCongNhanVienThiCongListService();
    this.chuyenHoSoMienPhiTramNamDanService = new ChuyenHoSoMienPhiTramNamDanService();
    this.updateTonKhoSoSachService = new UpdateTonKhoSoSachService();
    this.updateTonKhoService = new UpdateTonKhoService();
    this.updateNhanVienChucVuService = new UpdateNhanVienChucVuService();
    this.getAllKhaiBaoRaNgoaiService = new GetAllKhaiBaoRaNgoaiService();
    this.updateKhaiBaoRaNgoaiService = new UpdateKhaiBaoRaNgoaiService();
    this.getAllDuongPhoLDService = new GetAllDuongPhoLDService();
    this.addDuongPhoLDService = new AddDuongPhoLDService();
    this.thanhToanTheoKyService = new ThanhToanTheoKyService();
    this.dangKyDieuDongService = dangKyDieuDongService;
    this.getAllMangCap4Service = new GetAllMangCap4Service();
    this.khaiBaoNghiTuanService = new KhaiBaoNghiTuanService();
    this.getAllPhuongService = new GetAllPhuongService();
    const serverConfig = {
      name: 'api-service',
      version: '0.1.0'
    };

    this.tools = {
      update_nhan_vien_chuc_vu: {
        description: 'Cập nhật chức vụ nhân viên',
        inputSchema: {
          type: 'object',
          properties: {
            maNhanVien: { type: 'string', description: 'Mã nhân viên' },
            maPhongBan: { type: 'string', description: 'Mã phòng ban' }
          },
          required: ['maNhanVien', 'maPhongBan']
        }
      },
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
      chuyen_nhan_vien_thi_cong_giao_khoan: {
        description: 'Chuyển nhân viên thi công (Bản Giao Khoán)',
        inputSchema: {
          type: 'object',
          properties: {
            code: { 
              type: 'string', 
              description: 'Mã công trình' 
            },
            nhanVienThiCong: { 
              type: 'string', 
              description: 'Mã nhân viên thi công' 
            }
          },
          required: ['code', 'nhanVienThiCong']
        }
      },
      phan_cong_nhan_vien_ky_thuat_mang_cap_4: {
        description: 'Phân công nhân viên kỹ thuật (Mạng Cấp 4)',
        inputSchema: {
          type: 'object',
          properties: {
            maddk: { 
              type: 'string', 
              description: 'Mã đăng ký' 
            },
            maNhanVien: { 
              type: 'string', 
              description: 'Mã nhân viên' 
            }
          },
          required: ['maddk', 'maNhanVien']
        }
      },
      delete_lenh_dieu_xe_may: {
        description: 'Xóa lệnh điều xe máy',
        inputSchema: {
          type: 'object',
          properties: {
            Code: {
              type: 'string',
              description: 'Mã lệnh điều xe'
            }
          },
          required: ['Code']
        }
      },
      mo_in_lai_phieu_xuat_kho_vat_tu: {
        description: 'Mở in lại phiếu xuất kho vật tư',
        inputSchema: {
          type: 'object',
          properties: {
            soPhieuXuatKho: {
              type: 'string',
              description: 'Số phiếu xuất kho'
            },
            nam: {
              type: 'number',
              description: 'Năm của phiếu xuất kho'
            }
          },
          required: ['soPhieuXuatKho', 'nam']
        }
      },
      add_nha_san_xuat: {
        description: 'Thêm nhà sản xuất mới',
        inputSchema: {
          type: 'object',
          properties: {
            tenNhaSanXuat: {
              type: 'string',
              description: 'Tên nhà sản xuất'
            }
          },
          required: ['tenNhaSanXuat']
        }
      },
      them_nhan_vien_sxn: {
        description: 'Thêm nhân viên công việc SXN',
        inputSchema: {
          type: 'object',
          properties: {
            maNhanVien: {
              type: 'string',
              description: 'Mã nhân viên'
            },
            congViec: {
              type: 'string',
              description: 'Công việc'  
            },
            nhomCaTruc: {
              type: 'number',
              description: 'Nhóm ca trực'
            },
            diaDiem: {
              type: 'string',
              description: 'Địa điểm'
            }
          },
          required: ['maNhanVien', 'congViec', 'nhomCaTruc', 'diaDiem']
        }
      },
      chuyen_nhan_vien_ky_thuat_giao_khoan: {
        description: 'Chuyển nhân viên kỹ thuật (Bản Giao Khoán)',
        inputSchema: {
          type: 'object',
          properties: {
            code: { 
              type: 'string', 
              description: 'Mã công trình' 
            },
            maNhanVienKyThuat: { 
              type: 'string', 
              description: 'Mã nhân viên kỹ thuật' 
            }
          },
          required: ['code', 'maNhanVienKyThuat']
        }
      },
      get_lenh_dieu_xe_may: {
        description: 'Lấy thông tin lệnh điều xe máy',
        inputSchema: {
          type: 'object',
          properties: {
            Code: {
              type: 'string',
              description: 'Mã lệnh điều xe'
            }
          },
          required: ['Code']
        }
      },
      phan_cong_nhan_vien_thi_cong_mang_cap_4: {
        description: 'Phân công nhân viên thi công (Mạng Cấp 4)',
        inputSchema: {
          type: 'object',
          properties: {
            maddk: {
              type: 'string',
              description: 'Mã đăng ký'
            },
            maNhanVien: {
              type: 'string',
              description: 'Mã nhân viên'
            }
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
            thoiGianBatDauThucTe: { type: 'string', description: 'Thời gian bắt đầu thực tế (ISO format)' },
            thoiGianKetThucThucTe: { type: 'string', description: 'Thời gian kết thúc thực tế (ISO format)' }
          },
          required: ['khaiBaoID']
        }
      },
      get_all_duong_pho_ld: {
        description: 'Lấy danh sách tất cả đường phố LD',
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
      add_duong_pho_ld: {
        description: 'Thêm đường phố LD mới',
        inputSchema: {
          type: 'object',
          properties: {
            madpld: { type: 'string', description: 'Mã đường phố LD' },
            tenduongld: { type: 'string', description: 'Tên đường LD' },
            maphuong: { type: 'string', description: 'Mã phường (tùy chọn)' }
          },
          required: ['madpld', 'tenduongld']
        }
      },
      get_all_mang_cap4: {
        description: 'Lấy danh sách tất cả dữ liệu Mạng Cáp 4',
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
      thanh_toan_theo_ky: {
        description: 'Thanh toán theo kỳ',
        inputSchema: {
          type: 'object',
          properties: {
            idkh: { type: 'string', description: 'ID khách hàng' },
            thang: { type: 'number', description: 'Tháng thanh toán' },
            nam: { type: 'number', description: 'Năm thanh toán' },
            soTienThanhToan: { type: 'number', description: 'Số tiền thanh toán' },
            transactionID: { type: 'string', description: 'ID giao dịch' }
          },
          required: ['thang', 'nam', 'soTienThanhToan']
        }
      },
      dang_ky_dieu_dong: {
        description: 'Đăng ký điều động nhân viên',
        inputSchema: {
          type: 'object',
          properties: {
            ngayBatDau: { type: 'string', description: 'Ngày bắt đầu (ISO format)' },
            buoiBatDau: { type: 'string', description: 'Buổi bắt đầu (tùy chọn)' },
            ngayKetThuc: { type: 'string', description: 'Ngày kết thúc (ISO format)' },
            buoiKetThuc: { type: 'string', description: 'Buổi kết thúc (tùy chọn)' },
            ngayDoi: { type: 'string', description: 'Ngày đổi (ISO format, tùy chọn)' },
            buoiDoi: { type: 'string', description: 'Buổi đổi (tùy chọn)' },
            loaiLyDo: { type: 'string', description: 'Loại lý do (tùy chọn)' },
            chiTietLyDo: { type: 'string', description: 'Chi tiết lý do (tùy chọn)' },
            hinhThucDieuDong: { type: 'string', description: 'Hình thức điều động (tùy chọn)' },
            maNV: { type: 'string', description: 'Mã nhân viên (tùy chọn)' }
          },
          required: ['ngayBatDau', 'ngayKetThuc']
        }
      },
      dang_ky_nghi_tuan: {
        description: 'Đăng ký nghỉ tuần',
        inputSchema: {
          type: 'object',
          properties: {
            manv: { type: 'string', description: 'Mã nhân viên' },
            ngay: { type: 'string', description: 'Ngày nghỉ (ISO format)' }
          },
          required: ['manv', 'ngay']
        }
      },
      get_all_phuong: {
        description: 'Lấy danh sách tất cả phường',
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
      }
    };

    this.server = new Server(serverConfig, {
      capabilities: {
        tools: this.tools
      }
    });

    this.logger = new Logger();
    this.setupHandlers();
    
    this.server.onerror = (error) => this.logger.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.entries(this.tools).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: tool.inputSchema
      }))
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const createResponse = (content: string, error = false) => ({
        content: [{ type: 'text', text: content }]
      });

      switch (request.params.name) {
        case 'update_nhan_vien_chuc_vu': {
          const args = request.params.arguments || {};
          const params = {
            maNhanVien: String(args.maNhanVien || ''),
            maPhongBan: String(args.maPhongBan || '')
          };

          if (!params.maNhanVien || !params.maPhongBan) {
            return createResponse('Thiếu tham số bắt buộc (maNhanVien, maPhongBan)');
          }

          try {
            const result = await this.updateNhanVienChucVuService.updateNhanVienChucVu(params);
            this.logger.info('Cập nhật chức vụ nhân viên thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật chức vụ nhân viên', { params, error });
            return createResponse('Có lỗi xảy ra khi cập nhật chức vụ nhân viên: ' + (error instanceof Error ? error : String(error)));
          }
        }
        case 'check_connection': {
          try {
            const result = await this.statusService.checkConnection();
            this.logger.info('Kiểm tra kết nối thành công', { result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi kiểm tra kết nối', { error });
            return createResponse('Không thể kết nối tới API server');
          }
        }

        case 'search_employee': {
          const args = request.params.arguments || {};
          const params = {
            q: String(args.q || ''),
            limit: Number(args.limit || 10)
          };

          if (!params.q) {
            return createResponse('Thiếu tham số q');
          }

          try {
            const result = await employeeService.search(params);
            this.logger.info('Tìm kiếm nhân viên thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi tìm kiếm nhân viên', { params, error });
            return createResponse('Có lỗi xảy ra khi tìm kiếm nhân viên');
          }
        }

        case 'register_breakfast': {
          const args = request.params.arguments || {};
          const params = {
            maNhanVien: String(args.maNhanVien || ''),
            thoiGian: String(args.thoiGian || ''),         
          };

          if (!params.maNhanVien || !params.thoiGian) {
            return createResponse('Thiếu tham số bắt buộc (maNhanVien, thoiGian)');
          }

          try {
            const result = await breakfastService.register({
              maNhanVien: params.maNhanVien,
              thoiGian: params.thoiGian,
              soLuongDangKyAnSang:1,
              soLuongDangKyUongCafe: 0,
              soLuongDangKySuaChua:0,
              tuDongDangKy: false,
              ngoaiTru: 0
            });
            this.logger.info('Đăng ký ăn sáng thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi đăng ký ăn sáng', { params, error });
            return createResponse('Có lỗi xảy ra khi đăng ký ăn sáng');
          }
        }

        case 'update_hoa_chat': {
          const args = request.params.arguments || {};
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

          if (!params.ngay || !params.ca) {
            return createResponse('Thiếu tham số bắt buộc (ngay, ca)');
          }

          try {
            const result = await this.hoaChatService.updateHoaChatSXN(params);
            this.logger.info('Cập nhật hóa chất thành công', { args, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật hóa chất', { args, error });
            return createResponse('Có lỗi xảy ra khi cập nhật hóa chất' + { args, error });
          }
        }

        case 'xoa_anh_nghiem_thu': {
          const args = request.params.arguments || {};
          const params = {
            ResourceId: String(args.resourceId || '')
          };

          if (!params.ResourceId) {
            return createResponse('Thiếu tham số bắt buộc (resourceId)');
          }

          try {
            const result = await this.xoaAnhNghiemThuService.xoaAnhNghiemThu(params);
            this.logger.info('Xóa ảnh nghiệm thu thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi xóa ảnh nghiệm thu', { params, error });
            return createResponse('Có lỗi xảy ra khi xóa ảnh nghiệm thu' +  JSON.stringify(params) + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'update_lenh_dieu_xe_may': {
          const args = request.params.arguments || {};
            const params = {
            Code: String(args.Code || ''),
            ViTriBatDau: args.ViTriBatDau ? String(args.ViTriBatDau) : undefined,
            ViTriHoanThanh: args.ViTriHoanThanh ? String(args.ViTriHoanThanh) : undefined,
            ChiSoDongHoCongToMetBatDau: args.ChiSoDongHoCongToMetBatDau !== undefined ? Number(args.ChiSoDongHoCongToMetBatDau) : undefined,
            ChiSoDongHoCongToMetHoanThanh: args.ChiSoDongHoCongToMetHoanThanh !== undefined ? Number(args.ChiSoDongHoCongToMetHoanThanh) : undefined,
            ThoiGianBatDau: args.ThoiGianBatDau ? String(args.ThoiGianBatDau) : undefined,
            ThoiGianHoanThanh: args.ThoiGianHoanThanh ? String(args.ThoiGianHoanThanh) : undefined
            };

          // if (!params.Code) {
          //   return createResponse('Thiếu tham số bắt buộc (Code)');
          // }

          try {
            const result = await this.lenhDieuXeMayService.updateLenhDieuXeMay(params);
            this.logger.info('Cập nhật lệnh điều xe máy thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật lệnh điều xe máy', { params, error });
            return createResponse('Có lỗi xảy ra khi cập nhật lệnh điều xe máy: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'chuyen_nhan_vien_thi_cong_giao_khoan': {
          const args = request.params.arguments || {};
          const params = {
            code: String(args.code || ''),
            nhanVienThiCong: String(args.nhanVienThiCong || '')
          };

          if (!params.code || !params.nhanVienThiCong) {
            return createResponse('Thiếu tham số bắt buộc (code, nhanVienThiCong)');
          }

          try {
            const result = await this.chuyenNhanVienThiCongGiaoKhoanService.chuyenNhanVienThiCongGiaoKhoan(params);
            this.logger.info('Chuyển nhân viên thi công thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi chuyển nhân viên thi công', { params, error });
            return createResponse('Có lỗi xảy ra khi chuyển nhân viên thi công: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'phan_cong_nhan_vien_ky_thuat_mang_cap_4': {
          const args = request.params.arguments || {};
          const params = {
            maddk: String(args.maddk || ''),
            maNhanVien: String(args.maNhanVien || '')
          };

          if (!params.maddk || !params.maNhanVien) {
            return createResponse('Thiếu tham số bắt buộc (maddk, maNhanVien)');
          }
          try {
            const result = await this.phanCongNhanVienKyThuatService.phanCongNhanVienKyThuat(params);
            this.logger.info('Phân công nhân viên kỹ thuật thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi phân công nhân viên kỹ thuật', { params, error });
            return createResponse('Có lỗi xảy ra khi phân công nhân viên kỹ thuật: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'delete_lenh_dieu_xe_may': {
          const args = request.params.arguments || {};
          const params = {
            Code: String(args.Code || '')
          };

          if (!params.Code) {
            return createResponse('Thiếu tham số bắt buộc (Code)');
          }

          try {
            const result = await this.lenhDieuXeMayService.deleteLenhDieuXeMay(params);
            this.logger.info('Xóa lệnh điều xe máy thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi xóa lệnh điều xe máy', { params, error });
            return createResponse('Có lỗi xảy ra khi xóa lệnh điều xe máy: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'mo_in_lai_phieu_xuat_kho_vat_tu': {
          const args = request.params.arguments || {};
          const params = {
            soPhieuXuatKho: String(args.soPhieuXuatKho || ''),
            nam: Number(args.nam || 0)
          };

          if (!params.soPhieuXuatKho || !params.nam) {
            return createResponse('Thiếu tham số bắt buộc (soPhieuXuatKho, nam)');
          }

          try {
            const result = await this.moInLaiPhieuXuatKhoService.moInLaiPhieuXuatKho(params);
            this.logger.info('Mở in lại phiếu xuất kho vật tư thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi mở in lại phiếu xuất kho vật tư', { params, error });
            return createResponse('Có lỗi xảy ra khi mở in lại phiếu xuất kho vật tư: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'add_nha_san_xuat': {
          const args = request.params.arguments || {};
          const params = {
            tenNhaSanXuat: String(args.tenNhaSanXuat || '')
          };

          if (!params.tenNhaSanXuat) {
            return createResponse('Thiếu tham số bắt buộc (tenNhaSanXuat)');
          }

          try {
            const result = await this.addNhaSanXuatService.addNhaSanXuat(params);
            this.logger.info('Thêm nhà sản xuất thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi thêm nhà sản xuất', { params, error });
            return createResponse('Có lỗi xảy ra khi thêm nhà sản xuất: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'them_nhan_vien_sxn': {
          const args = request.params.arguments || {};
          const params = {
            maNhanVien: String(args.maNhanVien || ''),
            congViec: String(args.congViec || ''),
            nhomCaTruc: Number(args.nhomCaTruc || 0),
            diaDiem: String(args.diaDiem || '')
          };

          if (!params.maNhanVien || !params.congViec || !params.nhomCaTruc || !params.diaDiem) {
            return createResponse('Thiếu tham số bắt buộc (maNhanVien, congViec, nhomCaTruc, diaDiem)');
          }

          try {
            const result = await this.themNhanVienSXNService.themNhanVienSXN(params);
            this.logger.info('Thêm nhân viên công việc SXN thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi thêm nhân viên công việc SXN', { params, error });
            return createResponse('Có lỗi xảy ra khi thêm nhân viên công việc SXN: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'update_tths_mang_cap4': {
          const args = request.params.arguments || {};
          const params = {
            maddk: String(args.maddk || ''),
            newTTHS: String(args.newTTHS || '')
          };

          if (!params.maddk || !params.newTTHS) {
            return createResponse('Thiếu tham số bắt buộc (maddk, newTTHS)');
          }

          try {
            const result = await this.updateTTHSMangCap4Service.updateTTHS(params);
            this.logger.info('Cập nhật TTHS thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật TTHS', { params, error });
            return createResponse('Có lỗi xảy ra khi cập nhật TTHS: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'chuyen_nhan_vien_ky_thuat_giao_khoan': {
          const args = request.params.arguments || {};
          const params = {
            code: String(args.code || ''),
            maNhanVienKyThuat: String(args.maNhanVienKyThuat || '')
          };

          if (!params.code || !params.maNhanVienKyThuat) {
            return createResponse('Thiếu tham số bắt buộc (code, maNhanVienKyThuat)');
          }

          try {
            const result = await this.chuyenNhanVienKyThuatGiaoKhoanService.chuyenNhanVienKyThuatGiaoKhoan(params);
            this.logger.info('Chuyển nhân viên kỹ thuật giao khoán thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi chuyển nhân viên kỹ thuật giao khoán', { params, error });
            return createResponse('Có lỗi xảy ra khi chuyển nhân viên kỹ thuật giao khoán: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'get_lenh_dieu_xe_may': {
          const args = request.params.arguments || {};
          const params = {
            Code: String(args.Code || '')
          };

          if (!params.Code) {
            return createResponse('Thiếu tham số bắt buộc (Code)');
          }

          try {
            const result = await this.getLenhDieuXeMayService.getLenhDieuXeMay(params);
            this.logger.info('Lấy thông tin lệnh điều xe máy thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi lấy thông tin lệnh điều xe máy', { params, error });
            return createResponse('Có lỗi xảy ra khi lấy thông tin lệnh điều xe máy: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'phan_cong_nhan_vien_thi_cong_mang_cap_4': {
          const args = request.params.arguments || {};
          const params = {
            maddk: String(args.maddk || ''),
            maNhanVien: String(args.maNhanVien || '')
          };

          if (!params.maddk || !params.maNhanVien) {
            return createResponse('Thiếu tham số bắt buộc (maddk, maNhanVien)');
          }
          
          try {
            const result = await this.phanCongNhanVienThiCongService.phanCongNhanVienThiCong(params);
            this.logger.info('Phân công nhân viên thi công thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi phân công nhân viên thi công', { params, error });
            return createResponse('Có lỗi xảy ra khi phân công nhân viên thi công: ' + (error instanceof Error ? error : String(error)));
          }
        }

        case 'update_ton_kho': {
          const args = request.params.arguments || {};
          const params = {
            maVatTuHangHoa: Number(args.maVatTuHangHoa),
            maNhaSanXuat: Number(args.maNhaSanXuat),
            maKhoVatTu: Number(args.maKhoVatTu)
          };

          if (!params.maVatTuHangHoa || !params.maNhaSanXuat || !params.maKhoVatTu) {
            return createResponse('Thiếu tham số bắt buộc (maVatTuHangHoa, maNhaSanXuat, maKhoVatTu)');
          }

          try {
            const result = await this.updateTonKhoService.updateTonKho(params);
            this.logger.info('Cập nhật tồn kho thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật tồn kho', { params, error });
            return createResponse('Lỗi khi cập nhật tồn kho: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'update_ton_kho_so_sach': {
        const args = request.params.arguments || {};
        const params = {
          maKhoVatTu: Number(args.maKhoVatTu),
          maVatTuHangHoa: Number(args.maVatTuHangHoa),
          maNhaSanXuat: Number(args.maNhaSanXuat),
          tonKhoSoSach: Number(args.tonKhoSoSach)
        };

        if (!params.maKhoVatTu || !params.maVatTuHangHoa || !params.maNhaSanXuat || !params.tonKhoSoSach) {
          return createResponse('Thiếu tham số bắt buộc (maKhoVatTu, maVatTuHangHoa, maNhaSanXuat, tonKhoSoSach)');
        }

        try {
          const result = await this.updateTonKhoSoSachService.updateTonKhoSoSach(params);
          this.logger.info('Cập nhật tồn kho sổ sách thành công', { params, result });
          return createResponse(JSON.stringify(result, null, 2));
        } catch (error) {
          this.logger.error('Lỗi khi cập nhật tồn kho sổ sách', { params, error });
          return createResponse('Lỗi khi cập nhật tồn kho sổ sách: ' + (error instanceof Error ? error.message : String(error)));
        }
        }

        case 'phan_cong_nhan_vien_thi_cong_list': {
          const args = request.params.arguments || {};
          const params = {
            maNhanVien: String(args.maNhanVien || ''),
            danhSachMa: Array.isArray(args.danhSachMa) ? args.danhSachMa : []
          };

          if (!params.maNhanVien || !params.danhSachMa.length) {
            return createResponse('Thiếu tham số bắt buộc (maNhanVien, danhSachMa)');
          }

          try {
            const result = await this.phanCongNhanVienThiCongListService.phanCongNhanVienThiCongList(params);
            this.logger.info('Phân công nhân viên thi công list thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi phân công nhân viên thi công list', { params, error });
            return createResponse('Lỗi khi phân công nhân viên thi công list: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'chuyen_ho_so_mien_phi_tram_nam_dan': {
          const args = request.params.arguments || {};
          const params = {
            danhSachMa: Array.isArray(args.danhSachMa) ? args.danhSachMa : []
          };

          if (!params.danhSachMa.length) {
            return createResponse('Thiếu tham số bắt buộc (danhSachMa)');
          }

          try {
            const result = await this.chuyenHoSoMienPhiTramNamDanService.chuyenHoSoMienPhiTramNamDan(params);
            this.logger.info('Chuyển hồ sơ miễn phí trạm nâm dan thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi chuyển hồ sơ miễn phí trạm nâm dan', { params, error });
            return createResponse('Lỗi khi chuyển hồ sơ miễn phí trạm nâm dan: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'update_khai_bao_ra_ngoai': {
          const args = request.params.arguments || {};
          const params = {
            khaiBaoID: Number(args.khaiBaoID || 0),
            thoiGianBatDauThucTe: args.thoiGianBatDauThucTe ? String(args.thoiGianBatDauThucTe) : undefined,
            thoiGianKetThucThucTe: args.thoiGianKetThucThucTe ? String(args.thoiGianKetThucThucTe) : undefined
          };

          if (!params.khaiBaoID) {
            return createResponse('Thiếu tham số bắt buộc (khaiBaoID)');
          }

          try {
            const result = await this.updateKhaiBaoRaNgoaiService.updateKhaiBaoRaNgoai(params);
            this.logger.info('Cập nhật khai báo ra ngoài thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi cập nhật khai báo ra ngoài', { params, error });
            return createResponse('Lỗi khi cập nhật khai báo ra ngoài: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'get_all_khai_bao_ra_ngoai': {
          const args = request.params.arguments || {};
          const params = {
            limit: args.limit !== undefined ? Number(args.limit) : undefined,
            start: args.start !== undefined ? Number(args.start) : undefined,
            filter: args.filter ? String(args.filter) : undefined,
            q: args.q ? String(args.q) : undefined,
            sort: args.sort ? String(args.sort) : undefined,
            order: args.order ? String(args.order) : undefined,
            after: args.after ? String(args.after) : undefined
          };

          try {
            const result = await this.getAllKhaiBaoRaNgoaiService.getAllKhaiBaoRaNgoai(params);
            this.logger.info('Lấy danh sách khai báo ra ngoài thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi lấy danh sách khai báo ra ngoài', { params, error });
            return createResponse('Lỗi khi lấy danh sách khai báo ra ngoài: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'get_all_duong_pho_ld': {
          const args = request.params.arguments || {};
          const params = {
            limit: args.limit !== undefined ? Number(args.limit) : undefined,
            start: args.start !== undefined ? Number(args.start) : undefined,
            filter: args.filter ? String(args.filter) : undefined,
            q: args.q ? String(args.q) : undefined,
            sort: args.sort ? String(args.sort) : undefined,
            order: args.order ? String(args.order) : undefined,
            after: args.after ? String(args.after) : undefined
          };

          try {
            const result = await this.getAllDuongPhoLDService.getAllDuongPhoLD(params);
            this.logger.info('Lấy danh sách đường phố LD thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi lấy danh sách đường phố LD', { params, error });
            return createResponse('Lỗi khi lấy danh sách đường phố LD: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'add_duong_pho_ld': {
          const args = request.params.arguments || {};
          const params = {
            madpld: String(args.madpld || ''),
            tenduongld: String(args.tenduongld || ''),
            maphuong: args.maphuong ? String(args.maphuong) : undefined
          };

          if (!params.madpld || !params.tenduongld) {
            return createResponse('Thiếu tham số bắt buộc (madpld, tenduongld)');
          }

          try {
            const result = await this.addDuongPhoLDService.addDuongPhoLD(params);
            this.logger.info('Thêm đường phố LD thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi thêm đường phố LD', { params, error });
            return createResponse('Lỗi khi thêm đường phố LD: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'get_all_mang_cap4': {
          const args = request.params.arguments || {};
          const params = {
            limit: args.limit !== undefined ? Number(args.limit) : undefined,
            start: args.start !== undefined ? Number(args.start) : undefined,
            filter: args.filter ? String(args.filter) : undefined,
            q: args.q ? String(args.q) : undefined,
            sort: args.sort ? String(args.sort) : undefined,
            order: args.order ? String(args.order) : undefined,
            after: args.after ? String(args.after) : undefined
          };

          try {
            const result = await this.getAllMangCap4Service.getAllMangCap4(params);
            this.logger.info('Lấy danh sách dữ liệu Mạng Cáp 4 thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi lấy danh sách dữ liệu Mạng Cáp 4', { params, error });
            return createResponse('Lỗi khi lấy danh sách dữ liệu Mạng Cáp 4: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'thanh_toan_theo_ky': {
          const args = request.params.arguments || {};
          const params = {
            idkh: args.idkh ? String(args.idkh) : null,
            thang: Number(args.thang || 0),
            nam: Number(args.nam || 0),
            soTienThanhToan: Number(args.soTienThanhToan || 0),
            transactionID: args.transactionID ? String(args.transactionID) : null
          };

          if (!params.thang || !params.nam || !params.soTienThanhToan) {
            return createResponse('Thiếu tham số bắt buộc (thang, nam, soTienThanhToan)');
          }

          try {
            const result = await this.thanhToanTheoKyService.thanhToanTheoKy(params);
            this.logger.info('Thanh toán theo kỳ thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi thực hiện thanh toán theo kỳ', { params, error });
            return createResponse('Có lỗi xảy ra: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'dang_ky_dieu_dong': {
          const args = request.params.arguments || {};
          const params = {
            ngayBatDau: String(args.ngayBatDau || ''),
            buoiBatDau: args.buoiBatDau ? String(args.buoiBatDau) : undefined,
            ngayKetThuc: String(args.ngayKetThuc || ''),
            buoiKetThuc: args.buoiKetThuc ? String(args.buoiKetThuc) : undefined,
            ngayDoi: args.ngayDoi ? String(args.ngayDoi) : undefined,
            buoiDoi: args.buoiDoi ? String(args.buoiDoi) : undefined,
            loaiLyDo: args.loaiLyDo ? String(args.loaiLyDo) : undefined,
            chiTietLyDo: args.chiTietLyDo ? String(args.chiTietLyDo) : undefined,
            hinhThucDieuDong: args.hinhThucDieuDong ? String(args.hinhThucDieuDong) : undefined,
            maNV: args.maNV ? String(args.maNV) : undefined
          };

          if (!params.ngayBatDau || !params.ngayKetThuc) {
            return createResponse('Thiếu tham số bắt buộc (ngayBatDau, ngayKetThuc)');
          }

          try {
            const result = await this.dangKyDieuDongService.dangKyDieuDong(params);
            this.logger.info('Đăng ký điều động thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi đăng ký điều động', { params, error });
            return createResponse('Có lỗi xảy ra khi đăng ký điều động: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        case 'dang_ky_nghi_tuan': {
          const args = request.params.arguments || {};
          const params = {
            manv: String(args.manv || ''),
            ngay: String(args.ngay || '')
          };

          if (!params.manv || !params.ngay) {
            return createResponse('Thiếu tham số bắt buộc (manv, ngay)');
          }

          try {
            const result = await this.khaiBaoNghiTuanService.dangKyNghiTuan(params);
            this.logger.info('Đăng ký nghỉ tuần thành công', { params, result });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi đăng ký nghỉ tuần', { params, error });
            return createResponse('Có lỗi xảy ra khi đăng ký nghỉ tuần: ' + (error instanceof Error ? error.message : String(error)));
          }
        }
        
        case 'get_all_phuong': {
          const args = request.params.arguments || {};
          try {
            const result = await this.getAllPhuongService.getAllPhuong(args);
            this.logger.info('Lấy danh sách phường thành công', { args });
            return createResponse(JSON.stringify(result, null, 2));
          } catch (error) {
            this.logger.error('Lỗi khi lấy danh sách phường', { args, error });
            return createResponse('Có lỗi xảy ra khi lấy danh sách phường: ' + (error instanceof Error ? error.message : String(error)));
          }
        }

        default:
          return createResponse(`Tool không tồn tại: ${request.params.name}`);
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    this.logger.info('API Server đã khởi động và sẵn sàng nhận lệnh');
  }
}

// Khởi động server
const server = new ApiServer();
server.start().catch((error) => {
  console.error('Lỗi khởi động server:', error);
  process.exit(1);
});
