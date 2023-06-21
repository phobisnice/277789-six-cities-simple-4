import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer(): Container {
  const offerContainer = new Container();
  offerContainer.bind<OfferServiceInterface>(AppComponent.OfferServiceInterface).to(OfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(AppComponent.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
