import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { AppComponent } from '../../types/app-component.enum.js';
import { DatabaseClientInterface } from './database-client.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';

const RETRY_COUNT = 5;
const RETRY_DELAY = 1000;

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {}

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`);
        await setTimeout(RETRY_DELAY);
      }
    }

    this.logger.error(`Unable to establish database connection after ${attempt}`);
    throw new Error('Failed to connect to the database');
  }

  private async _connect(uri: string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.mongooseInstance = null;
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');
    await this._connect(uri);
    this.logger.info('Database connecting is successful');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('No active connection with database');
    }

    await this._disconnect();
    this.logger.info('Database connection closed');
  }
}
