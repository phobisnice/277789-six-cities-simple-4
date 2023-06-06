import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';

@injectable()
export default class RestApplication {
  constructor(
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) {}

  public async init() {
    this.logger.info('App init process');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
