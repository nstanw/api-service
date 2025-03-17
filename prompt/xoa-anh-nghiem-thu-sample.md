# Prompt mẫu: Xóa Ảnh nghiệm thu cho MCP Server

Đây là template prompt mẫu được chia thành 2 phần như sau:

---

## Phần 1: Thông tin do người dùng cung cấp

- **Endpoint:** `/api/services/app/TuanAnhAppServices/XoaAnhNghiemThu`
- **Phương thức:** POST
- **Dữ liệu gửi đi:**
  - Có thể gửi dưới dạng **Parameters** trong query string **hoặc** gửi dưới dạng **body**.
  - Nếu sử dụng **body**, bạn sẽ cung cấp dữ liệu theo định dạng DTO. Ví dụ:
  
  ```typescript
  export interface XoaAnhNghiemThuInput {
    fieldA: string;        // Bắt buộc - mô tả: Mã hoặc tên ảnh nghiệm thu cần xóa.
    fieldB: number;        // Bắt buộc - mô tả: Số lượng hoặc chỉ số liên quan.
    optionalField1?: string; // Tùy chọn - mô tả: Thông tin bổ sung nếu cần.
  }
  ```

- **Lưu ý:**  
  - Nếu sử dụng body, hãy đảm bảo rằng bạn cung cấp đầy đủ các trường cần thiết theo định nghĩa của DTO.
  - AI sẽ sử dụng thông tin được cung cấp để suy luận và tự bổ sung các thông tin còn thiếu khi tạo prompt tích hợp.

---

## Phần 2: Hướng dẫn tích hợp kịch bản vào dự án (dựa theo Working Directory Changes)

Các bước tích hợp dựa trên thay đổi cập nhật gần đây (ví dụ như kịch bản `updateHoaChatSXN`):

1. **Cập nhật Config (src/config.ts):**
   - Thêm mục mới cho kịch bản “XoaAnhNghiemThu”:
     ```typescript
     const CONFIG = {
       TOOLS: {
         // Các mục khác ...
         XOA_ANT: {
           ACTION: '/api/services/app/TuanAnhAppServices/XoaAnhNghiemThu'
         }
       }
     };
     ```

2. **Thêm định nghĩa Interface (src/types.ts):**
   - Tạo interface cho input của kịch bản:
     ```typescript
     export interface XoaAnhNghiemThuInput {
       fieldA: string;
       fieldB: number;
       optionalField1?: string;
     }
     ```

3. **Tạo Service mới (src/services):**
   - Tạo file mới (ví dụ: `src/services/xoa-anh-nghiem-thu.service.ts`) với nội dung:
     ```typescript
     import { XoaAnhNghiemThuInput } from '../types.js';
     import { ApiClient } from '../utils/api-client.js';
     import { Logger } from '../utils/logger.js';
     import { CONFIG } from '../config.js';

     export class XoaAnhNghiemThuService {
       private logger = new Logger();

       async xoaAnhNghiemThu(input: XoaAnhNghiemThuInput) {
         try {
           this.logger.debug('Calling XoaAnhNghiemThu API', {
             url: CONFIG.TOOLS.XOA_ANT.ACTION,
             input
           });
           
           const response = await ApiClient.post<any>(CONFIG.TOOLS.XOA_ANT.ACTION, input);
           
           this.logger.debug('API Response received', { response });
           this.logger.info('Successfully executed XoaAnhNghiemThu', { input });
           
           return response.result;
         } catch (error: any) {
           this.logger.debug('API call failed', {
             error: error.message,
             stack: error.stack,
             response: error.response?.data
           });
           this.logger.error('Error in XoaAnhNghiemThu', { error, input });
           throw error;
         }
       }
     }
     ```

4. **Export Service:**
   - Cập nhật file `src/services/index.ts` để export service mới:
     ```typescript
     export * from './xoa-anh-nghiem-thu.service.js';
     ```

5. **Định nghĩa Tool và cập nhật Handler (src/index.ts):**
   - Thêm tool mới vào định nghĩa trong `this.tools`:
     ```typescript
     this.tools = {
       // ... các tool hiện có
       xoa_anh_nghiem_thu: {
         description: 'Xóa Ảnh nghiệm thu theo yêu cầu',
         inputSchema: {
           type: 'object',
           properties: {
             fieldA: { type: 'string', description: 'Mô tả fieldA' },
             fieldB: { type: 'number', description: 'Mô tả fieldB' },
             optionalField1: { type: 'string', description: 'Mô tả optionalField1' }
           },
           required: ['fieldA', 'fieldB']
         }
       }
     }
     ```
   - Cập nhật phần xử lý yêu cầu trong `src/index.ts`:
     ```typescript
     case 'xoa_anh_nghiem_thu': {
       const args = request.params.arguments || {};
       const params = {
         fieldA: String(args.fieldA || ''),
         fieldB: Number(args.fieldB || 0),
         optionalField1: args.optionalField1
       };

       if (!params.fieldA || !params.fieldB) {
         return createResponse('Thiếu tham số bắt buộc (fieldA, fieldB)');
       }

       try {
         const result = await this.xoaAnhNghiemThuService.xoaAnhNghiemThu(params);
         this.logger.info('Xóa Ảnh nghiệm thu thành công', { args, result });
         return createResponse(JSON.stringify(result, null, 2));
       } catch (error) {
         this.logger.error('Lỗi khi xóa Ảnh nghiệm thu', { args, error });
         return createResponse('Có lỗi xảy ra khi xóa Ảnh nghiệm thu' + JSON.stringify({ args, error }));
       }
     }
     ```
   - Đừng quên khởi tạo service mới trong constructor của lớp `ApiServer`:
     ```typescript
     this.xoaAnhNghiemThuService = new XoaAnhNghiemThuService();
     ```

6. **Cập nhật README.md (nếu cần):**
   - Thêm mục liệt kê tool mới `xoa_anh_nghiem_thu` cùng mô tả ngắn gọn.

7. **Build và kiểm tra:**
   - Chạy `npm run build` để build lại dự án.
   - Thực hiện kiểm tra và chạy thử để đảm bảo kịch bản mới hoạt động như mong đợi.

---

## Cách sử dụng Prompt mẫu này

- **Bước 1:** Sử dụng phần “Thông tin do người dùng cung cấp” để nhập dữ liệu đầu vào.
- **Bước 2:** Dựa vào phần “Hướng dẫn tích hợp” để thực hiện các bước cập nhật mã nguồn vào dự án của bạn.
- **Bước 3:** Build lại dự án sau các thay đổi và kiểm tra hoạt động.

Mẫu prompt này cung cấp một hướng dẫn toàn diện, bạn chỉ cần thay đổi các trường (như `fieldA`, `fieldB`) và endpoint nếu cần thiết cho các kịch bản khác.

---

*Lưu ý: Nội dung này là mẫu, bạn có thể tự bổ sung thông tin khi cần thiết dựa trên yêu cầu cụ thể của từng kịch bản.*
