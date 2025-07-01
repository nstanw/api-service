## Brief overview
Hướng dẫn các bước thêm một tool mới vào MCP server, bao gồm cách cập nhật các file cần thiết.

## Các file cần sửa đổi
1. Tạo file service mới trong `src/services/`: 
   - Đặt tên theo format: `TenService.service.ts`
   - Implement các phương thức xử lý logic

2. Cập nhật `src/types.ts`:
   - Thêm interface cho input parameters
   ```typescript
   export interface TenToolInput {
     param1: string;
     param2: string;
   }
   ```

3. Cập nhật `src/config.ts`:
   - Thêm endpoint mới vào CONFIG.TOOLS
   ```typescript
   TOOLS: {
     TUANANH: {
       TEN_TOOL: '/api/services/app/Controller/Action'
     }
   }
   ```

4. Cập nhật `src/services/index.ts`:
   - Export service mới
   ```typescript
   export * from './ten-tool.service.js';
   ```

5. Cập nhật `src/index.ts`:
   - Import service mới
   - Khai báo biến private
   - Khởi tạo trong constructor
   - Thêm tool definition
   - Thêm case xử lý

## Quy tắc thêm case mới trong index.ts
- Thêm import cho service mới ở đầu file
- Khai báo biến private trong class `ApiServer`
- Khởi tạo service trong constructor
- Thêm định nghĩa tool vào object `this.tools`
- Thêm case xử lý trong switch statement
- Log đầy đủ thông tin thành công/thất bại

## Ví dụ cấu trúc case
```typescript
case 'ten_tool_moi': {
  const args = request.params.arguments || {};
  const params = {
    thamSo1: String(args.thamSo1 || ''),
    thamSo2: Number(args.thamSo2 || 0)
  };

  if (!params.thamSo1 || !params.thamSo2) {
    return createResponse('Thiếu tham số bắt buộc (thamSo1, thamSo2)');
  }

  try {
    const result = await this.tenServiceMoi.phuongThucMoi(params);
    this.logger.info('Thực hiện tool mới thành công', { params, result });
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    this.logger.error('Lỗi khi thực hiện tool mới', { params, error });
    return createResponse('Có lỗi xảy ra khi thực hiện tool mới: ' + (error instanceof Error ? error : String(error)));
  }
}

```

## Lưu ý sau khi thêm tool mới
- Sau khi hoàn tất các bước thêm tool mới vào MCP server, cần chạy lệnh `npm run build` để build lại dự án và áp dụng các thay đổi.
