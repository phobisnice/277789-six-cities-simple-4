import 'reflect-metadata';
import { Container } from 'inversify';
import ConfigService from './core/config/config.service.js';
import PinoService from './core/logger/pino.service.js';
import RestApplication from './app/rest.js';
import { AppComponent } from './types/app-component.enum.js';
import { LoggerInterface } from './core/logger/logger.interface.js';
import { ConfigInterface } from './core/config/config.interface.js';
import { RestSchema } from './core/config/rest.schema.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  const application = container.get<RestApplication>(AppComponent.RestApplication);

  await application.init();
}

bootstrap();
