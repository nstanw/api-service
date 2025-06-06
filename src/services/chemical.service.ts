import { ApiClient } from '../utils/api-client.js';
import { CONFIG } from '../config.js';
import { UpdateHoaChatSXNInput } from '../types.js';

export class ChemicalService {
  async updateHoaChatSXN(params: UpdateHoaChatSXNInput) {
    const response = await ApiClient.post(CONFIG.TOOLS.HOA_CHAT.UPDATE, params);
    return response.result;
  }
}

export const chemicalService = new ChemicalService();
