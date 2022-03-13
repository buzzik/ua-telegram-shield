import { Api } from 'telegram/tl';
import { TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import logger from '../logger';

const input = require('input');

class Telegram {
  #client: any;

  #apiId: number;

  #apiHash: string;

  #storeSession: StoreSession;

  constructor() {
    this.#apiId = 11982962;
    this.#apiHash = '26c616b0c06f37ac7515e612ef30b919';
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
    return true;
  }

  async sendMessage(target: string, params: object) {
    return this.#client.sendMessage(target, params);
  }

  async reportPeer(peer: string, message: string) {
    const result = await this.#client.invoke(
      new Api.account.ReportPeer({
        peer,
        reason: new Api.InputReportReasonOther(),
        message,
      }),
    );
    if (result) {
      logger.info(`Reported user "${peer}" with message "${message}"`);
    } else {
      logger.warn(`Can't report ${peer}`);
    }
  }
}

export default Telegram;
