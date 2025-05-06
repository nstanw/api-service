## Brief overview
Hướng dẫn sử dụng MCP tools trong hệ thống ERP của công ty, tập trung vào việc xử lý các thao tác liên quan đến lệnh điều xe và các chức năng khác

## Quy tắc sử dụng
- Luôn kiểm tra dữ liệu hiện tại trước khi thực hiện bất kỳ thay đổi nào
- Chỉ thay đổi các trường cần thiết, giữ nguyên các trường khác
- Xác nhận dữ liệu sau khi cập nhật để đảm bảo tính chính xác

## API service
- Sử dụng get_lenh_dieu_xe_may trước khi thực hiện thay đổi để xem thông tin hiện tại
- Khi cập nhật, chỉ gửi các trường cần thay đổi trong update_lenh_dieu_xe_may
- Xác minh kết quả bằng cách gọi lại get_lenh_dieu_xe_may sau khi cập nhật

## Xử lý số liệu
- Đối với chỉ số công tơ mét:
  - Kiểm tra logic giữa chỉ số bắt đầu và kết thúc
  - Đảm bảo số km di chuyển được tính toán hợp lý
  - Lưu ý sự chênh lệch giữa các chỉ số

## Lưu ý đặc biệt
- Kiểm tra kỹ thông tin trước khi cập nhật để tránh sai sót
- Thực hiện từng bước một và xác nhận kết quả sau mỗi bước
- Không thay đổi các thông tin không liên quan đến yêu cầu

## Quản lý tác vụ MCP
- Ghi log đầy đủ các tác vụ theo định dạng:
  - Previous Conversation: Tóm tắt yêu cầu của người dùng
  - Current Work: Liệt kê các task đã hoàn thành
  - Key Technical Concepts: Liệt kê các API Service đã sử dụng
  - Problem Solving: Ghi lại các bước xử lý chính
  - Pending Tasks: Ghi chú về trạng thái hoàn thành

## Xử lý nhân sự
- Khi tìm kiếm thông tin nhân viên:
  - Sử dụng API search_employee để xác minh thông tin
  - Lưu ý xác nhận đúng mã nhân viên trước khi thực hiện thao tác
  - Kiểm tra kết quả sau mỗi thao tác liên quan đến nhân viên

## Giao khoán và đăng ký
- Đối với chuyển giao khoán:
  - Xác nhận thông tin người nhận trước khi chuyển
  - Thực hiện chuyển từng bản giao khoán một
  - Kiểm tra kết quả sau mỗi lần chuyển
- Đối với đăng ký ăn sáng:
  - Kiểm tra thông tin nhân viên trước
  - Xác nhận ngày đăng ký chính xác
