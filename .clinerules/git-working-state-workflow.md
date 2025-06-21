## Brief overview
- Hướng dẫn về quy trình làm việc với git khi có các thay đổi trong thư mục làm việc, nhằm đảm bảo các thay đổi được quản lý và đẩy lên repository một cách hiệu quả.

## Communication style
- Giao tiếp ngắn gọn, tập trung vào các bước thực hiện git như add, commit, và push.
- Thông báo rõ ràng về trạng thái của từng bước trong quy trình git.

## Development workflow
- Khi có thay đổi trong thư mục làm việc (`git_working_state`), thực hiện các bước sau:
  - Sử dụng `git add .` để thêm tất cả các thay đổi vào staging area.
  - Tạo thông điệp commit tự động dựa trên nội dung thay đổi, ví dụ: "Add new MCP tool for Mang Cap 4 data retrieval".
  - Sử dụng `git push` để đẩy các thay đổi lên repository.
- Yêu cầu phê duyệt từ người dùng trước khi thực hiện các lệnh git có thể ảnh hưởng đến repository.

## Coding best practices
- Đảm bảo rằng các thay đổi trong code được kiểm tra kỹ lưỡng trước khi commit.
- Sử dụng thông điệp commit mô tả rõ ràng và liên quan đến nội dung thay đổi.

## Project context
- Quy trình này áp dụng cho dự án MCP API Service, nơi các thay đổi thường liên quan đến việc thêm hoặc cập nhật các tool và service mới.

## Other guidelines
- Luôn kiểm tra output của lệnh git để xác nhận rằng không có lỗi xảy ra trong quá trình commit hoặc push.
- Nếu có vấn đề, thông báo ngay cho người dùng để xử lý.
