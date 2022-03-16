import fs from 'fs/promises';
import axios from 'axios';
import logger from '../../modules/logger';
import Telegram from '../../modules/telegram';
import { randomize, splitByLines } from '../../lib/utils';
import config from '../../modules/config';

class ReporterService {
  #telegram: Telegram;

  #peers: Array<string>;

  #messages: Array<string>;

  #pauseDelay: number;

  #peerDelay: number;

  #messagesFilePath: string;

  #peersGistPath: string;

  #inProcess: boolean;

  constructor(telegram: Telegram) {
    this.#telegram = telegram;
    this.#peers = [];
    this.#messages = [];
    this.#pauseDelay = config.reporterPauseDelay + randomize(config.reporterPauseDelay);
    this.#peerDelay = config.reporterPeerDelay;
    this.#messagesFilePath = './data/report-messages/other.txt';
    // this.#peersFilePath = './data/report-peers/other.txt';
    this.#peersGistPath = 'https://gist.githubusercontent.com/buzzik/5a32e535f8c8b6f466f92c491829a1e1/raw/';
    this.#inProcess = false;
  }

  async run() {
    logger.info('Running Reporter Service');

    await this.reportAll();
    const reportAll = this.reportAll.bind(this);
    setInterval(reportAll, this.#pauseDelay);
  }

  async #loadData(): Promise<boolean> {
    logger.info('Loading data...');
    const messagesText: string = await fs.readFile(this.#messagesFilePath, 'utf-8');
    const messages: Array<string> = splitByLines(messagesText);
    if (!messages.length) throw new Error('No report messages passed');

    const peersText = await axios.get(this.#peersGistPath);
    const peers: Array<string> = splitByLines(peersText.data);
    if (!peers.length) throw new Error('No report messages passed');

    this.#peers = peers;
    this.#messages = messages;

    return true;
  }

  async delayedReportOne(peer: string) {
    return new Promise((resolve, reject) => {
      const delay = this.#peerDelay + randomize(this.#peerDelay);
      logger.info(`Waiting ${delay / 1000} s to report`);

      setTimeout(async () => {
        try {
          const result = await this.reportOne(peer);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async reportOne(peer: string) {
    const rnd = randomize(this.#messages.length);
    const message = this.#messages[rnd];
    const result = await this.#telegram.reportPeer(peer, message);
    return result;
  }

  async reportAll() {
    await this.#loadData();

    if (this.#inProcess) return false;
    this.#inProcess = true;
    // logger.info('reportAll');

    // eslint-disable-next-line no-restricted-syntax
    for (const peer of this.#peers) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.delayedReportOne(peer);
      } catch (error) {
        if (error.code === 420) {
          logger.error('Flood block, stoping current loop');
          break;
        }
        logger.error(error);
      }
    }
    const nextTime = new Date(new Date().getTime() + this.#pauseDelay);

    logger.info(`Done reporting. Next report loop will start on ${nextTime}`);

    this.#inProcess = false;

    return true;
  }
}

export default ReporterService;
