const CONFIG = {
  API_BASE_URL: 'https://localhost:44311',
  LOG_PATH: './logs',
  TOOLS: {
    EMPLOYEE: {
      GET_ALL: '/api/services/app/NhanVien/GetAll',
      GET_BY_ID: '/api/services/app/NhanVien/Get'
    },
    BREAKFAST: {
      REGISTER: '/api/services/app/AnSang/DangKyAnSang2'
    }
  }
};

export { CONFIG };
