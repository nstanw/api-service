## Brief overview
Hướng dẫn các bước thêm một tool mới vào MCP server, bao gồm cách cập nhật các file cần thiết.

## Các file cần sửa đổi

1. Cập nhật `src/types.ts`:
   - Thêm interface cho input parameters
   ```typescript
   export interface NewToolInput {
     param1: string;
     param2: string;
   }
   ```

2. Cập nhật `src/config.ts`:
   - Thêm endpoint mới vào CONFIG.TOOLS
   ```typescript
   TOOLS: {
     TUANANH: {
       NEW_TOOL: '/api/services/app/Controller/Action'
     }
   }
   ```

3. Cập nhật `src/services/domain.service.ts`:
   - Thêm phương thức mới vào service tương ứng với domain của tool
   - Nếu chưa có service phù hợp, tạo service mới
   ```typescript
   export class DomainService {
     async newTool(params: NewToolInput) {
       const response = await ApiClient.post(CONFIG.TOOLS.TUANANH.NEW_TOOL, params);
       return response.result;
     }
   }
   ```

4. Cập nhật `src/handlers/index.ts`:
   - Thêm handler mới vào object handlers tương ứng
   ```typescript
   export const domainHandlers = {
     // ...các handlers khác
     
     newTool: (args: any) => {
       const params = {
         param1: String(args.param1 || ''),
         param2: String(args.param2 || '')
       };
       return handleApiCall(
         () => domainService.newTool(params),
         params,
         'Có lỗi xảy ra khi thực hiện tool mới'
       );
     }
   };
   ```

5. Cập nhật `src/tools.ts`:
   - Thêm định nghĩa tool mới
   ```typescript
   export const tools: Record<string, Tool> = {
     // ...các tools khác
     
     new_tool: {
       description: 'Mô tả chức năng của tool mới',
       inputSchema: {
         type: 'object',
         properties: {
           param1: { type: 'string', description: 'Mô tả tham số 1' },
           param2: { type: 'string', description: 'Mô tả tham số 2' }
         },
         required: ['param1', 'param2']
       }
     }
   };
   ```

6. Cập nhật `src/index.ts`:
   - Thêm case mới vào switch statement
   ```typescript
   switch (request.params.name) {
     // ...các case khác
     
     case 'new_tool':
       return domainHandlers.newTool(args);
   }
   ```

## Ví dụ cấu trúc handler
```typescript
newTool: (args: any) => {
  const params = {
    param1: String(args.param1 || ''),
    param2: String(args.param2 || '')
  };
  
  return handleApiCall(
    () => domainService.newTool(params),
    params, // các tham số bắt buộc cần kiểm tra
    'Thông báo lỗi khi thất bại'
  );
}
```

## Quy tắc đặt tên
- Tên tool: `new_tool` (snake_case)
- Tên service: `DomainService` (PascalCase)
- Tên file service: `domain.service.ts` (kebab-case)
- Tên method: `newTool` (camelCase)
- Tên interface: `NewToolInput` (PascalCase)
- Tên constant: `NEW_TOOL` (SCREAMING_SNAKE_CASE)

## Cấu trúc thư mục
```
src/
├── handlers/            # Logic xử lý các tool
│   └── index.ts        # Các handlers được nhóm theo domain
├── services/           # Services theo domain
│   └── domain.service.ts
├── config.ts          # Cấu hình API endpoints
├── tools.ts           # Tool definitions
├── types.ts           # Type definitions
└── index.ts           # Entry point
