# Quy Trình Thêm Kịch Bản Mới

## 1. Tổng Quan
Tài liệu này mô tả quy trình thêm một kịch bản (scenario) mới vào hệ thống API service.

## 2. Các Bước Thực Hiện

### 2.1. Thêm Endpoint
- Định nghĩa endpoint mới trong `src/config.ts`
- Tuân thủ cấu trúc đặt tên và phân nhóm có sẵn

### 2.2. Thêm Interface
- Tạo interface mới trong `src/types.ts` cho input/output của API
- Đặt tên theo format: `[Action][Resource]Input`
- Định nghĩa các tham số bắt buộc và tùy chọn

### 2.3. Tạo/Cập Nhật Service
- Thêm phương thức mới vào service tương ứng trong `src/services/`
- Implement các chức năng: gọi API, xử lý lỗi, logging

### 2.4. Cập Nhật Server
Trong `src/index.ts`:
- Thêm tool mới vào danh sách tools với:
  + Description
  + Input schema
  + Required parameters
- Thêm case xử lý trong switch-case của handleToolCall

## 3. Ví dụ: Thêm API Xóa Lệnh Điều Xe Máy

### 3.1. Thêm Endpoint
```typescript
// src/config.ts
LENH_DIEU_XE_MAY: {
  UPDATE: '...',
  DELETE: '/api/services/app/TuanAnhAppServices/DeleteLenhDieuXeMay'
}
```

### 3.2. Thêm Interface
```typescript
// src/types.ts
export interface DeleteLenhDieuXeMayInput {
  Code: string;
}
```

### 3.3. Thêm Method trong Service
```typescript
// src/services/lenh-dieu-xe-may.service.ts
async deleteLenhDieuXeMay(input: DeleteLenhDieuXeMayInput) {
  try {
    this.logger.debug('Calling delete lenh dieu xe may API', {
      url: CONFIG.TOOLS.LENH_DIEU_XE_MAY.DELETE,
      input
    });
    
    const response = await ApiClient.delete(CONFIG.TOOLS.LENH_DIEU_XE_MAY.DELETE, {
      params: input
    });
    
    this.logger.info('Successfully deleted lenh dieu xe may', { input });
    return response.result;
  } catch (error) {
    this.logger.error('Error deleting lenh dieu xe may', { error, input });
    throw error;
  }
}
```

### 3.4. Thêm Tool và Case Xử Lý
```typescript
// src/index.ts
// Thêm vào danh sách tools
delete_lenh_dieu_xe_may: {
  description: 'Xóa lệnh điều xe máy',
  inputSchema: {
    type: 'object',
    properties: {
      Code: {
        type: 'string',
        description: 'Mã lệnh điều xe'
      }
    },
    required: ['Code']
  }
}

// Thêm case xử lý
case 'delete_lenh_dieu_xe_may': {
  const args = request.params.arguments || {};
  const params = {
    Code: String(args.Code || '')
  };

  if (!params.Code) {
    return createResponse('Thiếu tham số bắt buộc (Code)');
  }

  try {
    const result = await this.lenhDieuXeMayService.deleteLenhDieuXeMay(params);
    this.logger.info('Xóa lệnh điều xe máy thành công', { params, result });
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    this.logger.error('Lỗi khi xóa lệnh điều xe máy', { params, error });
    return createResponse('Có lỗi xảy ra khi xóa lệnh điều xe máy: ' + error);
  }
}
```

## 4. Lưu Ý & Best Practices

1. **Nhất Quán**
   - Tuân thủ cấu trúc đặt tên hiện có
   - Sử dụng các pattern code đã được thiết lập

2. **Xử Lý Lỗi**
   - Luôn implement try/catch
   - Log đầy đủ thông tin lỗi
   - Trả về thông báo lỗi rõ ràng

3. **Logging**
   - Log đầy đủ các bước: debug trước khi gọi API, info khi thành công
   - Include đầy đủ params trong log

4. **Validation**
   - Kiểm tra các tham số bắt buộc
   - Validate kiểu dữ liệu của input

5. **Documentation**
   - Mô tả rõ ràng với description
   - Định nghĩa đầy đủ input schema
