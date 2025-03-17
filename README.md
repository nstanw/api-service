# MCP API Service

Một máy chủ Model Context Protocol (MCP) để tương tác với API hệ thống

## Tính năng

### Công cụ
- `check_connection` - Kiểm tra kết nối tới API server
- `search_employee` - Tìm kiếm nhân viên theo tên hoặc mã
- `register_breakfast` - Đăng ký ăn sáng cho nhân viên
- `update_hoa_chat` - Cập nhật thông tin hóa chất theo ca

## Phát triển

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

## Cài đặt

Để sử dụng với Claude Desktop, thêm cấu hình server vào file:

- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "api-service": {
      "command": "đường-dẫn-tới/api-service/build/index.js"
    }
  }
}
```

### Gỡ lỗi

Máy chủ MCP hoạt động bằng cách giao tiếp qua stdio (standard input/output). Stdio là các kênh giao tiếp chuẩn trong lập trình, tương tự như việc:

- **Standard Input (stdin)**: Giống như cách bạn nhập lệnh vào Terminal/Command Prompt
- **Standard Output (stdout)**: Nơi hiển thị kết quả, giống như khi Terminal hiện thông báo thành công
- **Standard Error (stderr)**: Kênh riêng để hiện thông báo lỗi, giống như khi Terminal báo "file không tồn tại"

Trong trường hợp máy chủ MCP:
- Nhận yêu cầu từ người dùng qua stdin (ví dụ: lệnh tìm kiếm nhân viên)
- Trả kết quả qua stdout (ví dụ: thông tin nhân viên tìm được)
- Ghi các lỗi gặp phải qua stderr (ví dụ: lỗi kết nối database)

Điều này gây khó khăn cho việc gỡ lỗi vì:
- Không thể đặt breakpoint và debug trực tiếp như với ứng dụng thông thường
- Khó theo dõi luồng dữ liệu vào/ra
- Log lỗi có thể bị trộn lẫn với output

Để giải quyết vấn đề này, chúng tôi khuyến nghị sử dụng [MCP Inspector](https://github.com/modelcontextprotocol/inspector). Đây là công cụ giúp:
- Theo dõi chi tiết các yêu cầu gửi đến máy chủ
- Xem kết quả trả về của từng yêu cầu
- Kiểm tra log lỗi một cách riêng biệt
- Giám sát hiệu năng của máy chủ

Để khởi động Inspector:

```bash
npm run inspector
```

Inspector sẽ cung cấp một URL để truy cập giao diện web. Tại đây bạn có thể:
- Xem realtime các yêu cầu đang được xử lý
- Kiểm tra chi tiết từng request/response
- Tìm kiếm và lọc các log
- Theo dõi metrics về hiệu năng
