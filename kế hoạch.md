# Kế hoạch thêm tool update_ton_kho_so_sach

## Sơ đồ tổng quan
```mermaid
flowchart TD
  A[1. Tạo Service mới] --> B[2. Thêm interface trong [`src/types.ts`](src/types.ts:1)]
  B --> C[3. Cập nhật endpoint trong [`src/config.ts`](src/config.ts:18)]
  C --> D[4. Export service trong [`src/services/index.ts`](src/services/index.ts:1)]
  D --> E[5. Cài đặt trong [`src/index.ts`](src/index.ts:318)]
  E --> F[   • Import service\n   • Khai báo biến private\n   • Khởi tạo trong constructor\n   • Thêm definition vào this.tools\n   • Thêm case xử lý trong switch ]
```

## Chi tiết các bước

1. Tạo file [`src/services/update-ton-kho-so-sach.service.ts`](src/services/update-ton-kho-so-sach.service.ts:1)  
   - Class `UpdateTonKhoSoSachService`  
   - Method `async updateTonKhoSoSach(input: UpdateTonKhoSoSachInput)`

2. Thêm interface trong [`src/types.ts`](src/types.ts:1):
   ```typescript
   export interface UpdateTonKhoSoSachInput {
     maKhoVatTu: number;
     maVatTuHangHoa: number;
     maNhaSanXuat: number;
     tonKhoSoSach: number;
   }
   ```

3. Cập nhật endpoint trong [`src/config.ts`](src/config.ts:18):
   ```typescript
   CONFIG.TOOLS.TON_KHO_HIEN_TAI = {
     UPDATE_TON_KHO_SO_SACH: '/api/services/app/TonKhoHienTai/UpdateTonKhoSoSach'
   };
   ```

4. Export service trong [`src/services/index.ts`](src/services/index.ts:1):
   ```typescript
   export * from './update-ton-kho-so-sach.service.js';
   ```

5. Cập nhật trong [`src/index.ts`](src/index.ts:318):
   - Import và khai báo:
     ```typescript
     private tonKhoHienTaiService: UpdateTonKhoSoSachService;
     ```
   - Khởi tạo:
     ```typescript
     this.tonKhoHienTaiService = new UpdateTonKhoSoSachService();
     ```
   - Định nghĩa trong `this.tools`:
     ```typescript
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
     ```
   - Thêm `case 'update_ton_kho_so_sach'` xử lý logic theo mẫu.