import Telegram from './modules/telegram';
import logger from './modules/logger';
import ReporterService from './services/reporter-service';
import { Config } from './modules/config';

const input = require('input');

(async () => {
  logger.info('initializing config');
  await Config.init();

  logger.info('initializing telegram client');
  const telegram = new Telegram();
  await telegram.init();

  logger.info('initializing reporter service');
  const reporter = new ReporterService(telegram);
  reporter.run();

  // await telegram.sendMessage('me', { message: 'trying to report!' });
  return true;
}
)().catch(async (error) => {
  logger.error(`Can't initialize telegram client.  ${error} \n Stoping...`);
  await input.text('Press enter to exit');
  process.exit();
});
