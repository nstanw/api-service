import winston from 'winston';
import { CONFIG } from '../config.js';

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({ 
          filename: `${CONFIG.LOG_PATH}/error.log`, 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: `${CONFIG.LOG_PATH}/combined.log` 
        })
      ]
    });

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  public info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  public error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  public debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}

export { Logger };
