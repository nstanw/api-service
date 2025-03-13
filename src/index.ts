#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { employeeService, breakfastService } from './services/index.js';
import { Logger } from './utils/logger.js';

interface SearchEmployeeParams {
  q: string;
  limit?: number;
}

interface RegisterBreakfastParams {
  maNhanVien: string;
  thoiGian: string;
  soLuongAnSang?: number;
  soLuongCafe?: number;
  soLuongSuaChua?: number;
}

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

  constructor() {
    const serverConfig = {
      name: 'api-service',
      version: '0.1.0'
    };

    this.tools = {
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
