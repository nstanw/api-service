# Template: Thêm Tool Mới cho MCP Server

Đây là template để thêm tool mới vào MCP Server. Chỉ cần cung cấp thông tin API và làm theo các bước.

---

## Phần 1: Thông tin API (Người dùng cung cấp)

**Ví dụ:**
- **Endpoint:** `/api/services/app/TuanAnhAppServices/PhanCongNhanVienThiCongList`
- **Phương thức:** POST
- **Parameters:**
  - `maNhanVien` (string, query) - Mã nhân viên
- **Request body:**
  ```json
  [
    "string"
  ]
  ```

**Template:**
- **Endpoint:** `[ENDPOINT_URL]`
- **Phương thức:** `[HTTP_METHOD]`
- **Parameters:**
  - `[param_name]` (`[type]`, `[location]`) - `[description]`
- **Request body:**
  ```json
  [BODY_STRUCTURE]
  ```

---

## Phần 2: Các bước thực hiện

### Bước 1: Cập nhật Config (src/config.ts)
```typescript
export const CONFIG = {
  ENDPOINTS: {
    // ... các endpoint khác
    [TOOL_NAME_UPPER]: '[ENDPOINT_URL]'
  }
};
```

### Bước 2: Thêm Interface (src/types.ts)
```typescript
export interface [ToolName]Input {
  [paramName]: [type];  // Từ query params
  [bodyFieldName]: [type][];  // Từ request body
}
```

### Bước 3: Tạo Service (src/services/[tool-name].service.ts)
```typescript
import { [ToolName]Input } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class [ToolName]Service {
  private logger = new Logger();

  async [methodName](input: [ToolName]Input) {
    try {
      this.logger.debug('Calling [tool name] API', {
        url: CONFIG.ENDPOINTS.[TOOL_NAME_UPPER],
        input
      });

      // Tách query params và body
      const { [paramName], [bodyFieldName] } = input;
      const queryParams = `?[paramName]=${encodeURIComponent([paramName])}`;
      const url = `${CONFIG.ENDPOINTS.[TOOL_NAME_UPPER]}${queryParams}`;
      
      const response = await ApiClient.[httpMethod]<any>(url, [bodyFieldName]);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully executed [tool name]', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error in [tool name]', { error, input });
      throw error;
    }
  }
}
```

### Bước 4: Export Service (src/services/index.ts)
```typescript
export * from './[tool-name].service.js';
```

### Bước 5: Cập nhật Main Server (src/index.ts)

#### a) Import service
```typescript
import { [ToolName]Service } from './services/index.js';
```

#### b) Khai báo biến private
```typescript
private [toolName]Service: [ToolName]Service;
```

#### c) Khởi tạo trong constructor
```typescript
this.[toolName]Service = new [ToolName]Service();
```

#### d) Thêm tool definition
```typescript
this.tools = {
  // ... các tool khác
  [tool_name]: {
    description: '[Tool Description]',
    inputSchema: {
      type: 'object',
      properties: {
        [paramName]: { type: '[type]', description: '[param description]' },
        [bodyFieldName]: {
          type: 'array',
          items: { type: '[item_type]' },
          description: '[body field description]'
        }
      },
      required: ['[paramName]', '[bodyFieldName]']
    }
  }
}
```

#### e) Thêm case xử lý
```typescript
case '[tool_name]': {
  const args = request.params.arguments || {};
  const params = {
    [paramName]: String(args.[paramName] || ''),
    [bodyFieldName]: Array.isArray(args.[bodyFieldName]) ? args.[bodyFieldName] : []
  };

  if (!params.[paramName] || !params.[bodyFieldName].length) {
    return createResponse('Thiếu tham số bắt buộc ([paramName], [bodyFieldName])');
  }

  try {
    const result = await this.[toolName]Service.[methodName](params);
    this.logger.info('[Success message]', { params, result });
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    this.logger.error('[Error message]', { params, error });
    return createResponse('[Error response]: ' + (error instanceof Error ? error.message : String(error)));
  }
}
```

---

## Ví dụ cụ thể: PhanCongNhanVienThiCongList

### Thông tin API:
- **Endpoint:** `/api/services/app/TuanAnhAppServices/PhanCongNhanVienThiCongList`
- **Phương thức:** POST
- **Parameters:** `maNhanVien` (string, query)
- **Request body:** Array of strings

### Áp dụng template:

#### 1. Config:
```typescript
export const CONFIG = {
  ENDPOINTS: {
    PHAN_CONG_NHAN_VIEN_THI_CONG_LIST: '/api/services/app/TuanAnhAppServices/PhanCongNhanVienThiCongList'
  }
};
```

#### 2. Interface:
```typescript
export interface PhanCongNhanVienThiCongListInput {
  maNhanVien: string;
  danhSachMa: string[];
}
```

#### 3. Service:
```typescript
export class PhanCongNhanVienThiCongListService {
  async phanCongNhanVienThiCongList(input: PhanCongNhanVienThiCongListInput) {
    // Implementation như trên
  }
}
```

#### 4. Tool Definition:
```typescript
phan_cong_nhan_vien_thi_cong_list: {
  description: 'Phân công nhân viên thi công theo danh sách',
  inputSchema: {
    type: 'object',
    properties: {
      maNhanVien: { type: 'string', description: 'Mã nhân viên' },
      danhSachMa: {
        type: 'array',
        items: { type: 'string' },
        description: 'Danh sách mã cần phân công'
      }
    },
    required: ['maNhanVien', 'danhSachMa']
  }
}
```

---

## Cách sử dụng Template

1. **Thay thế các placeholder:**
   - `[ENDPOINT_URL]` → URL thực tế
   - `[HTTP_METHOD]` → GET/POST/PUT/DELETE
   - `[ToolName]` → Tên class (PascalCase)
   - `[tool_name]` → Tên tool (snake_case)
   - `[paramName]`, `[bodyFieldName]` → Tên các trường thực tế

2. **Tạo các file theo thứ tự:**
   - Cập nhật config.ts
   - Thêm interface vào types.ts
   - Tạo service file mới
   - Export service
   - Cập nhật index.ts

3. **Build và test:**
   ```bash
   npm run build
   ```

Template này đảm bảo tính nhất quán và đầy đủ khi thêm tool mới vào hệ thống.
