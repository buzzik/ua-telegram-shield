// import Telegram from './modules/telegram';
import logger from './modules/logger';
// import ReporterService from './services/reporter-service';
// import config from './modules/config';
import ApiService from './services/api-service';
import configFile from '../config.json';

(async () => {
  try {
    const apiService = new ApiService(configFile);
    const thing = await apiService.init();
    console.log(thing);
    return true;

    // logger.info('initializing telegram client');
    // const telegram = new Telegram();
    // await telegram.init();

    // logger.info('initializing reporter service');
    // const reporter = new ReporterService(telegram);
    // reporter.run();
    // // await telegram.sendMessage('me', { message: 'trying to report!' });
    // return true;
  } catch (error) {
    logger.error(`Can't initialize telegram client.  ${error} \n Stoping...`);
    return false;
  }
})();
