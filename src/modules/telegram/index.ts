import { Api } from 'telegram/tl';
import { TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import logger from '../logger';
import config from '../config';

const input = require('input');

class Telegram {
  #client: any;

  #apiId: number;

  #apiHash: string;

  #storeSession: StoreSession;

  constructor() {
    this.#apiId = config.apiId;
    this.#apiHash = config.apiHash;
    this.#storeSession = new StoreSession('data/session');
    this.#client = new TelegramClient(this.#storeSession, this.#apiId, this.#apiHash, {
      connectionRetries: 5,
    });
  }

  async init() {
    await this.#client.start({
      phoneNumber: async () => input.text('Please enter your number: '),
      password: async () => input.text('Please enter your password: '),
      phoneCode: async () => input.text('Please enter the code you received: '),
      onError: (err: any) => logger.error(err),
    });
    logger.info('You should now be connected.');
    return true;
  }

  async sendMessage(target: string, params: object) {
    return this.#client.sendMessage(target, params);
  }

  async reportPeer(peer: string, message: string) {
    try {
      await this.#client.invoke(
        new Api.account.ReportPeer({
          peer,
          reason: new Api.InputReportReasonOther(),
          message,
        }),
      );
      logger.info(`Reported peer "${peer}" with message "${message}"`);
    } catch (error) {
      logger.error(`Can't report ${peer} : ${error}`);
    }
  }
}

export default Telegram;
