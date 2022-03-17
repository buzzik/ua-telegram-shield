import fs from 'fs/promises';
import logger from '../logger';

const input = require('input');

interface ApiConfigIface {
  apiId: number;
  apiHash: string;
}

class ApiConfig {
  #config: ApiConfigIface;

  #apiConfigPath: string;

  constructor() {
    this.#apiConfigPath = './data/api-config.json';
    this.#config = { apiId: 0, apiHash: '' };
  }

  async getApiConfig(): Promise<ApiConfigIface> {
    try {
      await this.readConfigFromFile();
      if (!this.#config.apiId || !this.#config.apiHash) {
        await this.requestConfig();
        await this.saveConfig();
      }
    } catch (error) {
      logger.error(error);
    }

    return this.#config;
  }

  async readConfigFromFile() {
    try {
      const rawConfig = await fs.readFile(this.#apiConfigPath, 'utf8');
      this.#config = JSON.parse(rawConfig);
      return true;
    } catch (error) {
      logger.info('No config file with API config. Please enter it manually.');
      return false;
    }
  }

  async requestConfig() {
    const apiId: number = await input.text('Please enter your API_ID: ');
    const apiHash: string = await input.text('Please enter your API_HASH: ');
    this.#config.apiId = apiId;
    this.#config.apiHash = apiHash;
  }

  async saveConfig() {
    const fileContent = JSON.stringify(this.#config);
    return fs.writeFile(this.#apiConfigPath, fileContent, { flag: 'w+' });
  }
}
export default ApiConfig;
