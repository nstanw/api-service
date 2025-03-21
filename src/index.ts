#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { employeeService, breakfastService, HoaChatService, StatusService, XoaAnhNghiemThuService, LenhDieuXeMayService } from './services/index.js';
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

  constructor() {
    this.hoaChatService = new HoaChatService();
    this.statusService = new StatusService();
    this.xoaAnhNghiemThuService = new XoaAnhNghiemThuService();
    this.lenhDieuXeMayService = new LenhDieuXeMayService();
    const serverConfig = {
      name: 'api-service',
      version: '0.1.0'
    };

    this.tools = {
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
          //   return createResponse('Thiếu tham số bắt buộc (code)');
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
