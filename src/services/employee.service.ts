import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { Employee, SearchParams, ApiResponse, PagedResultDto, AbpPagedResponse } from '../types.js';

export class EmployeeService {
  async search(params: SearchParams): Promise<ApiResponse<Employee[]>> {
    try {
      const response = await ApiClient.get<ApiResponse<PagedResultDto<Employee>>>(
        CONFIG.TOOLS.EMPLOYEE.GET_ALL, 
        { 
          params: {
            q: params.q,
            limit: params.limit,
            start: 0,
            filter: '',
            sort: '',
            order: ''
          }
        }
      );
      
      const pagedResult = response.result as unknown as PagedResultDto<Employee>;
      
      return {
        result: pagedResult?.items || [],
        targetUrl: response.targetUrl,
        success: response.success,
        error: null,
        unAuthorizedRequest: false
      };
    } catch (error: any) {
      console.error('Employee search error:', error);
      return {
        result: [],
        targetUrl: null,
        success: false,
        error: error.message || 'Unknown error',
        unAuthorizedRequest: error.response?.status === 401
      };
    }
  }

  async getById(id: string): Promise<ApiResponse<Employee | null>> {
    try {
      const response = await ApiClient.get<ApiResponse<Employee>>(
        `${CONFIG.TOOLS.EMPLOYEE.GET_BY_ID}/${id}`
      );
      
      if (response.success && response.result) {
        const employee = response.result as unknown as Employee;
        return {
          result: employee,
          targetUrl: response.targetUrl,
          success: true,
          error: null,
          unAuthorizedRequest: false
        };
      }
      
      return {
        result: null,
        targetUrl: response.targetUrl,
        success: false,
        error: 'Employee not found',
        unAuthorizedRequest: false
      };
    } catch (error: any) {
      console.error('Get employee by id error:', error);
      return {
        result: null,
        targetUrl: null,
        success: false,
        error: error.message || 'Unknown error',
        unAuthorizedRequest: error.response?.status === 401
      };
    }
  }
}

export const employeeService = new EmployeeService();
