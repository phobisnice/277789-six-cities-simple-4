import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, data: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
