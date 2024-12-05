import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'debug',
      defaultMeta: { service: 'customer-service' },
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message, stack, ...meta }) => {
            const log = {
              timestamp,
              level,
              message,
              ...(stack && { stack }),
              ...meta,
            };
            return JSON.stringify(log);
          },
        ),
      ),
      transports: [
        new winston.transports.Console(),
        //TODO: Add Sumo Logic transport and configure it to something like this
        // new SumoLogicTransport({
        //   url: process.env.SUMOLOGIC_URL, // Your Sumo Logic HTTP Source URL
        //   json: true,
        //   level: 'info', // Adjust the log level as needed
        // }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
