import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, printf, colorize,
} = format;

const myFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, message, timestamp,
}) => `[${timestamp}] [${level}]: ${message}`);

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({
      // format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // label({ stack: true }),
    // format.splat(),
    // format.json(),
    myFormat,
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.Console(),
    // new transports.File({ filename: 'quick-start-error.log', level: 'error' }),
    new transports.File({ filename: 'logs/log.log' }),
  ],
});

export default logger;
