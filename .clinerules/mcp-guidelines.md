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

## Sửa giờ khai báo ra ngoài
- Quy trình xử lý:
  1. Tìm kiếm nhân viên:
     - Sử dụng search_employee với họ tên đầy đủ
     - Nếu không tìm thấy, thử tìm với từng phần của tên
     - Yêu cầu người dùng xác nhận mã nhân viên trước khi tiếp tục
  2. Xem lịch sử khai báo:
     - Sử dụng get_all_khai_bao_ra_ngoai với limit mặc định là 5
     - Hiển thị danh sách để người dùng chọn
  3. Cập nhật thông tin:
     - Yêu cầu người dùng xác nhận khaiBaoID và giờ cần cập nhật
     - Sử dụng update_khai_bao_ra_ngoai để thực hiện thay đổi
     - Kiểm tra lại kết quả sau khi cập nhật

## Thêm tên đường mới
- Quy trình xử lý:
  1. Kiểm tra tên đường:
     - Sử dụng get_all_duong_pho_ld với từ khóa tìm kiếm chính xác
     - Nếu không tìm thấy, thử tìm với từng phần của tên
     - Kiểm tra các đường có tên tương tự để tránh trùng lặp
  
  2. Quy tắc đặt mã đường (madpld):
     - Tối đa 4 ký tự in hoa
     - Ưu tiên sử dụng chữ cái đầu của các từ trong tên đường
     - Kiểm tra mã đề xuất trước khi sử dụng để đảm bảo không trùng
     - Một số mẫu phổ biến:
       + 2 ký tự: Viết tắt 2 từ đầu (VD: DL - Duy Tân)
       + 3 ký tự: Thêm một ký tự để phân biệt (VD: DLI - Đông Liên)
       + 4 ký tự: Thêm ký tự đặc trưng (VD: DLIE - Đông Liên)

  3. Thêm đường mới:
     - Sử dụng add_duong_pho_ld với các tham số bắt buộc:
       + madpld: Mã đường đã kiểm tra không trùng
       + tenduongld: Tên đường chuẩn hóa
     - maphuong: Có thể để trống (null) và cập nhật sau
     - Kiểm tra kết quả sau khi thêm mới

  4. Xác minh thông tin:
     - Tìm kiếm lại bằng get_all_duong_pho_ld để kiểm tra
     - Đảm bảo thông tin đã được thêm chính xác

- Lưu ý đặc biệt:
  + Đảm bảo tính duy nhất của mã đường
  + Chuẩn hóa tên đường (viết hoa chữ cái đầu)
  + Tham khảo mã của các đường tương tự khi đặt mã mới
  + Ghi chép lại các thay đổi vào log hệ thống
