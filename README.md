# MCP API Service

Máy chủ Model Context Protocol (MCP) để tương tác với các API hệ thống nội bộ

## Kiến Trúc Hệ Thống

### Tổng Quan
MCP API Service là một máy chủ trung gian hoạt động theo giao thức Model Context Protocol (MCP), giúp kết nối Claude AI với các API hệ thống nội bộ. Hệ thống này:

1. **Nhận lệnh từ Claude**: Người dùng yêu cầu thực hiện một tác vụ thông qua Claude
2. **Xử lý và chuyển đổi**: MCP chuyển đổi các yêu cầu từ người dùng sang định dạng API nội bộ
3. **Gọi API**: Thực hiện cuộc gọi đến các API nội bộ
4. **Trả kết quả**: Kết quả được định dạng và trả về Claude để hiển thị cho người dùng

### Cơ Chế Hoạt Động
Máy chủ MCP hoạt động bằng cách giao tiếp qua stdio (standard input/output):

- **Standard Input (stdin)**: Nhận yêu cầu từ Claude (ví dụ: lệnh tìm kiếm nhân viên)
- **Standard Output (stdout)**: Trả kết quả về cho Claude (ví dụ: thông tin nhân viên tìm được)
- **Standard Error (stderr)**: Ghi log lỗi (ví dụ: lỗi kết nối đến API)

Quy trình khi một yêu cầu được gửi:
1. Claude gửi yêu cầu dạng JSON qua stdin
2. MCP Server xử lý yêu cầu và gọi API thích hợp
3. MCP Server trả kết quả về cho Claude qua stdout
4. Claude hiển thị kết quả cho người dùng

## Tính Năng (Kịch Bản)

Các kịch bản hiện có:
- `check_connection` - Kiểm tra kết nối tới API server
- `search_employee` - Tìm kiếm nhân viên theo tên hoặc mã
- `register_breakfast` - Đăng ký ăn sáng cho nhân viên
- `update_hoa_chat` - Cập nhật thông tin hóa chất theo ca
- `chuyen_nhan_vien_thi_cong` - Chuyển nhân viên thi công giao khoán

## Thêm Kịch Bản Mới

### 1. Thêm Endpoint
Định nghĩa endpoint mới trong `src/config.ts`:
```typescript
export const CONFIG = {
  // ...existing code...
  TOOLS: {
    // ...existing code...
    TEN_NHOM_API: {
      ACTION_API: '/api/services/app/TenService/TenAction'
    }
  }
}
```

### 2. Thêm Interface
Tạo interface trong `src/types.ts` cho dữ liệu đầu vào/đầu ra:
```typescript
export interface TenActionInput {
  Param1: string;
  Param2: number;
  // Các tham số khác...
}
```

### 3. Tạo Service Mới hoặc Thêm Vào Service Hiện Có
Tạo file mới trong `src/services/` hoặc thêm vào service hiện có:
```typescript
// src/services/ten-service.service.ts
import { TenActionInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class TenService {
  private logger = new Logger();

  async tenAction(input: TenActionInput) {
    try {
      this.logger.debug('Calling ten action API', {
        url: CONFIG.TOOLS.TEN_NHOM_API.ACTION_API,
        input
      });
      
      const response = await ApiClient.post(
        CONFIG.TOOLS.TEN_NHOM_API.ACTION_API, 
        null,
        { params: input }
      );
      
      this.logger.info('Action completed successfully', { input });
      return response.result;
    } catch (error) {
      this.logger.error('Error performing action', { error, input });
      throw error;
    }
  }
}
```

### 4. Cập Nhật Index
Trong `src/index.ts`:
- Thêm service mới (nếu có)
- Định nghĩa tool mới trong danh sách tools
- Thêm case xử lý trong hàm handleToolCall

## Phát Triển

Cài đặt thư viện:
```bash
npm install
```

Build server:
```bash
npm run build
```

Chạy chế độ phát triển với tự động build lại:
```bash
npm run watch
```


## Gỡ Lỗi

### Thách Thức
Việc gỡ lỗi MCP gặp khó khăn vì:
- Không thể đặt breakpoint như ứng dụng thông thường
- Khó theo dõi luồng dữ liệu vào/ra
- Log lỗi có thể bị trộn lẫn với output

### Giải Pháp
Sử dụng [MCP Inspector](https://github.com/modelcontextprotocol/inspector) để:
- Theo dõi yêu cầu gửi đến máy chủ
- Xem kết quả trả về của từng yêu cầu
- Kiểm tra log lỗi riêng biệt
- Giám sát hiệu năng

Khởi động Inspector:
```bash
npm run inspector
```

Inspector sẽ cung cấp URL truy cập giao diện web để theo dõi hoạt động của hệ thống.

## Best Practices

1. **Nhất Quán**
   - Tuân thủ cấu trúc đặt tên hiện có
   - Sử dụng mẫu code đã được thiết lập

2. **Xử Lý Lỗi**
   - Luôn implement try/catch
   - Log đầy đủ thông tin lỗi
   - Trả về thông báo lỗi rõ ràng

3. **Logging**
   - Log đầy đủ các bước: debug trước khi gọi API, info khi thành công
   - Bao gồm đầy đủ parameters trong log

4. **Validation**
   - Kiểm tra tham số bắt buộc
   - Validate kiểu dữ liệu của input

Xem thêm chi tiết trong `docs/add-new-scenario.md`.
