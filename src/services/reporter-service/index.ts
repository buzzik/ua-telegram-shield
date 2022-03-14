import fs from 'fs/promises';
import logger from '../../modules/logger';
import Telegram from '../../modules/telegram';
import { randomize, splitByLines } from '../../lib/utils';
import config from '../../modules/config';

const reportPeerName = ['RVvoenkor', 'herson_rus', 'herson_respublika'];
const reportMessages = ['The channel undermines the integrity of the Ukrainian state. Spreading fake news, misleading people. There are a lot of posts with threats against Ukrainians and Ukrainian soldiers. Block him ASAP!'];
class ReporterService {
  #telegram: Telegram;

  #peers: Array<string>;

  #messages: Array<string>;

  #pauseDelay: number;

  #peerDelay: number;

  #messagesFilePath: string;

  #inProcess: boolean;

  constructor(telegram: Telegram) {
    this.#telegram = telegram;
    this.#peers = reportPeerName;
    this.#messages = [];
    this.#pauseDelay = config.reporterPauseDelay + randomize(config.reporterPauseDelay);
    this.#peerDelay = config.reporterPeerDelay;
    this.#messagesFilePath = './data/report-messages/other.txt';
    this.#inProcess = false;
  }

  async run() {
    logger.info('running Reporter Service');
    this.#messages = await this.#loadMessages();

    await this.reportAll();
    const reportAll = this.reportAll.bind(this);
    setInterval(reportAll, this.#pauseDelay);
  }

  async #loadMessages(): Promise<string[]> {
    const text: string = await fs.readFile(this.#messagesFilePath, 'utf-8');
    const messages: Array<string> = splitByLines(text);
    return messages;
  }

  async delayedReportOne(peer: string) {
    return new Promise((resolve, reject) => {
      const delay = this.#peerDelay + randomize(this.#peerDelay);
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
    // logger.info('reportOne');
    logger.warn(peer);
    const rnd = randomize(this.#messages.length);
    const message = this.#messages[rnd];
    const result = await this.#telegram.reportPeer(peer, message);
    return result;
  }

  async reportAll() {
    if (this.#inProcess) return false;
    this.#inProcess = true;
    // logger.info('reportAll');

    // eslint-disable-next-line no-restricted-syntax
    for (const peer of this.#peers) {
      // eslint-disable-next-line no-await-in-loop
      await this.delayedReportOne(peer);
    }
    logger.info(`Done reporting. Next report loop will start in ${Math.floor(this.#pauseDelay / 1000 / 60)} minutes`);

    this.#inProcess = false;

    return true;
  }
}

export default ReporterService;
