import Telegram from './modules/telegram';
import logger from './modules/logger';

const reportPeerName = 'RVvoenkor';
const reportMessage = 'The channel undermines the integrity of the Ukrainian state. Spreading fake news, misleading people. There are a lot of posts with threats against Ukrainians and Ukrainian soldiers. Block him ASAP!';
(async () => {
  const telegram = new Telegram();
  await telegram.init();
  logger.info('You should now be connected.');
  await telegram.sendMessage('me', { message: 'trying to report!' });
  await telegram.reportPeer(reportPeerName, reportMessage);
})();
