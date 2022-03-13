import { TelegramClient } from 'telegram';
import { Api } from 'telegram/tl';
import { StoreSession } from 'telegram/sessions';
import logger from './modules/logger';

const input = require('input');

const apiId = 11982962;
const apiHash = '26c616b0c06f37ac7515e612ef30b919';
const storeSession = new StoreSession('data/session');

(async () => {
  logger.info('Loading interactive example...');
  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => input.text('Please enter your number: '),
    password: async () => input.text('Please enter your password: '),
    phoneCode: async () => input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });
  logger.info('You should now be connected.');
  // logger.info(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage('me', { message: 'trying to report!' });
  // const result = await client.invoke(
  //   new Api.account.ReportPeer({
  //     peer: 'RVvoenkor',
  //     reason: new Api.InputReportReasonOther(),
  //     message: 'The channel undermines the integrity of the Ukrainian state. Spreading fake news, misleading people. There are a lot of posts with threats against Ukrainians and Ukrainian soldiers. Block him ASAP!',
  //   }),
  // );
  // logger.info('Result is ', result);
})();
