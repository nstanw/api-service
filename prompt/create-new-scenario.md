# Template tạo kịch bản mới cho MCP Server

## 1. Cập nhật Config
```typescript
// Thêm endpoint vào config.ts
const CONFIG = {
  TOOLS: {
    YOUR_NEW: {
      ACTION: '/api/services/app/Controller/Action'
    }
  }
};
```

## 2. Định nghĩa Interface
```typescript
// Thêm vào types.ts
export interface YourNewInput {
  // Các trường bắt buộc
  field1: string;
  field2: number;
  // Các trường tùy chọn
  optionalField1?: string;
  optionalField2?: number;
}
```

## 3. Tạo Service
```typescript
// Tạo file mới trong src/services/your-new.service.ts
import { YourNewInput } from '../types.js';
import { ApiClient } from '../utils/api-client.js';
import { Logger } from '../utils/logger.js';
import { CONFIG } from '../config.js';

export class YourNewService {
  private logger = new Logger();

  async yourNewMethod(input: YourNewInput) {
    try {
      // Log debug request
      this.logger.debug('Calling your new API', {
        url: CONFIG.TOOLS.YOUR_NEW.ACTION,
        input
      });
      
      // Gọi API 
      const response = await ApiClient.put<any>(
        CONFIG.TOOLS.YOUR_NEW.ACTION,
        input
      );
      
      // Log thành công
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully processed', { input });
      
      return response.result;
    } catch (error: any) {
      // Log lỗi chi tiết
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      // Log error cấp cao
      this.logger.error('Error processing', { error, input });
      throw error;
    }
  }
}
```

## 4. Export Service
```typescript
// Thêm vào src/services/index.ts
export * from './your-new.service.js';
```

## 5. Định nghĩa Tool trong Server
```typescript
// Thêm vào src/index.ts trong phần tools
this.tools = {
  your_new_tool: {
    description: 'Mô tả chức năng của tool',
    inputSchema: {
      type: 'object',
      properties: {
        field1: { type: 'string', description: 'Mô tả field1' },
        field2: { type: 'number', description: 'Mô tả field2' },
        optionalField1: { type: 'string', description: 'Mô tả optional1' },
        optionalField2: { type: 'number', description: 'Mô tả optional2' }
      },
      required: ['field1', 'field2']
    }
  }
}
```

## 6. Xử lý Tool trong Server
```typescript
// Thêm vào src/index.ts trong phần xử lý CallToolRequestSchema
case 'your_new_tool': {
  const args = request.params.arguments || {};
  const params = {
    field1: String(args.field1 || ''),
    field2: Number(args.field2 || 0),
    optionalField1: args.optionalField1,
    optionalField2: Number(args.optionalField2)
  };

  // Validate params
  if (!params.field1 || !params.field2) {
    return createResponse('Thiếu tham số bắt buộc (field1, field2)');
  }

  try {
    const result = await this.yourNewService.yourNewMethod(params);
    this.logger.info('Xử lý thành công', { args, result });
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    this.logger.error('Có lỗi xảy ra', { args, error });
    return createResponse('Có lỗi xảy ra khi xử lý' + { args, error });
  }
}
```

## 7. Logger
```typescript
// Cấu trúc logger trong utils/logger.ts
import winston from 'winston';

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error'
        }),
        new winston.transports.File({
          filename: 'combined.log'
        })
      ]
    });

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.prettyPrint()
        ),
        level: 'debug'
      }));
    }
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }
}
```

## Ví dụ: Kịch bản cập nhật hóa chất

### 1. Config (src/config.ts)
```typescript
const CONFIG = {
  TOOLS: {
    HOA_CHAT: {
      UPDATE: '/api/services/app/TuanAnhAppServices/UpdateHoaChatSXN'
    }
  }
};
```

### 2. Interface (src/types.ts)  
```typescript
export interface UpdateHoaChatSXNInput {
  ngay: string;        // Ngày cập nhật (bắt buộc)
  ca: number;          // Ca làm việc (bắt buộc)
  hV_Voi?: number;     // Lượng vôi tại Hưng Vĩnh
  hV_Clo?: number;     // Lượng Clo tại Hưng Vĩnh  
  hV_PAC?: number;     // Lượng PAC tại Hưng Vĩnh
  cB_Voi?: number;     // Lượng vôi tại Cầu Bông
  cB_Clo?: number;     // Lượng Clo tại Cầu Bông
  cB_PAC?: number;     // Lượng PAC tại Cầu Bông
  hN_Voi?: number;     // Lượng vôi tại Hòa Ninh
  hN_Clo?: number;     // Lượng Clo tại Hòa Ninh
  hN_PAC?: number;     // Lượng PAC tại Hòa Ninh
}
```

### 3. Service (src/services/hoa-chat.service.ts)
```typescript
export class HoaChatService {
  private logger = new Logger();

  async updateHoaChatSXN(input: UpdateHoaChatSXNInput) {
    try {
      this.logger.debug('Calling update hoa chat SXN API', {
        url: CONFIG.TOOLS.HOA_CHAT.UPDATE,
        input
      });
      
      const response = await ApiClient.put<any>(CONFIG.TOOLS.HOA_CHAT.UPDATE, input);
      
      this.logger.debug('API Response received', { response });
      this.logger.info('Successfully updated hoa chat', { input });
      
      return response.result;
    } catch (error: any) {
      this.logger.debug('API call failed', {
        error: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      this.logger.error('Error updating hoa chat', { error, input });
      throw error;
    }
  }
}
```

### 4. Export Service (src/services/index.ts)
```typescript
export * from './hoa-chat.service.js';
```

### 5. Tool Definition (src/index.ts)
```typescript
this.tools = {
  update_hoa_chat: {
    description: 'Cập nhật thông tin hóa chất theo ca',
    inputSchema: {
      type: 'object',
      properties: {
        ngay: { type: 'string', description: 'Ngày (ISO format)' },
        ca: { type: 'number', description: 'Ca làm việc' },
        hV_Voi: { type: 'number', description: 'HV Vôi' },
        hV_Clo: { type: 'number', description: 'HV Clo' },
        hV_PAC: { type: 'number', description: 'HV PAC' },
        cB_Voi: { type: 'number', description: 'CB Vôi' },
        cB_Clo: { type: 'number', description: 'CB Clo' },
        cB_PAC: { type: 'number', description: 'CB PAC' },
        hN_Voi: { type: 'number', description: 'HN Vôi' },
        hN_Clo: { type: 'number', description: 'HN Clo' },
        hN_PAC: { type: 'number', description: 'HN PAC' }
      },
      required: ['ngay', 'ca']
    }
  }
}
```

### 6. Tool Handler (src/index.ts)
```typescript
case 'update_hoa_chat': {
  const args = request.params.arguments || {};
  const params = {
    ngay: String(args.ngay || ''),
    ca: Number(args.ca || 0),
    hV_Voi: Number(args.hV_Voi),
    hV_Clo: Number(args.hV_Clo),
    hV_PAC: Number(args.hV_PAC),
    cB_Voi: Number(args.cB_Voi),
    cB_Clo: Number(args.cB_Clo),
    cB_PAC: Number(args.cB_PAC),
    hN_Voi: Number(args.hN_Voi),
    hN_Clo: Number(args.hN_Clo),
    hN_PAC: Number(args.hN_PAC)
  };

  if (!params.ngay || !params.ca) {
    return createResponse('Thiếu tham số bắt buộc (ngay, ca)');
  }

  try {
    const result = await this.hoaChatService.updateHoaChatSXN(params);
    this.logger.info('Cập nhật hóa chất thành công', { args, result });
    return createResponse(JSON.stringify(result, null, 2));
  } catch (error) {
    this.logger.error('Lỗi khi cập nhật hóa chất', { args, error });
    return createResponse('Có lỗi xảy ra khi cập nhật hóa chất' + { args, error });
  }
}
```

## Cách sử dụng template
1. Thay thế các phần có tiền tố "your" bằng tên kịch bản mới
2. Điều chỉnh interface và các trường dữ liệu theo yêu cầu
3. Cập nhật endpoint API trong config
4. Copy các đoạn code mẫu vào các file tương ứng
5. Build và test kịch bản mới

## Thực hiện build
```bash
npm run build
