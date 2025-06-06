#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { tools } from './tools.js';
import {
  commonHandlers,
  employeeHandlers,
  vehicleHandlers,
  inventoryHandlers,
  documentHandlers,
  chemicalHandlers
} from './handlers/index.js';

// ===== Server Implementation =====
class ApiServer {
  private server: Server;

  constructor() {
    const serverConfig = {
      name: 'api-service',
      version: '0.1.0'
    };

    this.server = new Server(serverConfig, {
      capabilities: { tools }
    });

    this.setupHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.entries(tools).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: tool.inputSchema
      }))
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const args = request.params.arguments || {};

      switch (request.params.name) {
        // Common handlers
        case 'check_connection':
          return commonHandlers.checkConnection();
        case 'register_breakfast':
          return commonHandlers.registerBreakfast(args);
        case 'get_all_khai_bao_ra_ngoai':
          return commonHandlers.getAllKhaiBaoRaNgoai(args);
        case 'update_khai_bao_ra_ngoai':
          return commonHandlers.updateKhaiBaoRaNgoai(args);

        // Employee handlers
        case 'search_employee':
          return employeeHandlers.search(args);
        case 'chuyen_nhan_vien_thi_cong':
          return employeeHandlers.transferConstructionStaff(args);
        case 'phan_cong_nhan_vien_ky_thuat':
          return employeeHandlers.assignTechnicalStaff(args);
        case 'them_nhan_vien_sxn':
          return employeeHandlers.addSXNStaff(args);
        case 'chuyen_nhan_vien_ky_thuat_giao_khoan':
          return employeeHandlers.transferTechnicalStaff(args);
        case 'phan_cong_nhan_vien_thi_cong':
          return employeeHandlers.assignConstructionStaff(args);
        case 'phan_cong_nhan_vien_thi_cong_list':
          return employeeHandlers.assignConstructionStaffList(args);

        // Vehicle handlers
        case 'update_lenh_dieu_xe_may':
          return vehicleHandlers.updateLenhDieuXeMay(args);
        case 'delete_lenh_dieu_xe_may':
          return vehicleHandlers.deleteLenhDieuXeMay(args);
        case 'get_lenh_dieu_xe_may':
          return vehicleHandlers.getLenhDieuXeMay(args);

        // Inventory handlers
        case 'mo_in_lai_phieu_xuat_kho_vat_tu':
          return inventoryHandlers.moInLaiPhieuXuatKho(args);
        case 'add_nha_san_xuat':
          return inventoryHandlers.addNhaSanXuat(args);
        case 'update_ton_kho':
          return inventoryHandlers.updateTonKho(args);
        case 'update_ton_kho_so_sach':
          return inventoryHandlers.updateTonKhoSoSach(args);

        // Document handlers
        case 'xoa_anh_nghiem_thu':
          return documentHandlers.xoaAnhNghiemThu(args);
        case 'chuyen_ho_so_mien_phi_tram_nam_dan':
          return documentHandlers.chuyenHoSoMienPhiTramNamDan(args);

        // Chemical handlers
        case 'update_hoa_chat':
          return chemicalHandlers.updateHoaChatSXN(args);

        default:
          return {
            content: [{ type: 'text', text: `Tool không tồn tại: ${request.params.name}` }]
          };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log('API Server đã khởi động và sẵn sàng nhận lệnh');
  }
}

// Khởi động server
const server = new ApiServer();
server.start().catch((error) => {
  console.error('Lỗi khởi động server:', error);
  process.exit(1);
});
