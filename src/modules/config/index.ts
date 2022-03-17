import ApiConfig from '../api-config';
import 'dotenv/config';

interface ConfigIface {
  apiId: number;
  apiHash: string;
  reporterPauseDelay: number;
  reporterPeerDelay: number;
}
const config: ConfigIface = {
  apiId: 0,
  apiHash: '',
  reporterPauseDelay: 0,
  reporterPeerDelay: 0,
};
class Config {
  static async init() {
    const apiConfig = new ApiConfig();
    const { apiId, apiHash } = await apiConfig.getApiConfig();
    config.apiId = Number(apiId);
    config.apiHash = apiHash;
    config.reporterPauseDelay = Number(process.env.REPORTER_PAUSE_DELAY);
    config.reporterPeerDelay = Number(process.env.REPORTER_PEER_DELAY);

    return true;
  }
}
export {
  Config,
  config,
};
