import 'dotenv/config';

interface Config {
  apiId: number;
  apiHash: string;
  reporterPauseDelay: number;
  reporterPeerDelay: number;
}

const config: Config = {
  apiId: Number(process.env.API_ID),
  apiHash: String(process.env.API_HASH),
  reporterPauseDelay: Number(process.env.REPORTER_PAUSE_DELAY),
  reporterPeerDelay: Number(process.env.REPORTER_PEER_DELAY),
};

export default config;
