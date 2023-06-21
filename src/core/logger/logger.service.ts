import { injectable } from 'inversify';
import { LoggerInterface } from './logger.interface.js';

@injectable()
export default class ConsoleLoggerService implements LoggerInterface {
  info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }
}
