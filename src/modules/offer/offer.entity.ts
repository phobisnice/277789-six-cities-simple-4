import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntityType } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { OfferLimit } from '../../types/offer-limit.enum.js';
import { OfferKind } from '../../types/offer-kind.type.js';
import { DefaultOffer } from '../../types/default-offer.enum.js';
import { Location } from '../../types/location.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements OfferEntityType {
  @prop({
    required: true,
    trim: true,
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public createdDate!: Date;

  @prop({
    required: true,
    type: () => String,
  })
  public city!: City;

  @prop({
    required: true,
  })
  public previewImage!: string;

  @prop({
    required: true,
    default: [],
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    default: DefaultOffer.RATING,
    min: OfferLimit.MIN_RATING_VALUE,
    max: OfferLimit.MAX_RATING_VALUE,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public type!: OfferKind;

  @prop({
    required: true,
    default: DefaultOffer.ROOMS_COUNT,
    min: OfferLimit.MIN_ROOMS_COUNT,
    max: OfferLimit.MAX_ROOMS_COUNT,
  })
  public rooms!: number;

  @prop({
    required: true,
    default: DefaultOffer.MAX_ADULTS,
    min: OfferLimit.MIN_ADULTS_COUNT,
    max: OfferLimit.MAX_ADULTS_COUNT,
  })
  public maxAdults!: number;

  @prop({
    required: true,
    default: DefaultOffer.PRICE,
    min: OfferLimit.MIN_PRICE,
    max: OfferLimit.MAX_PRICE,
  })
  public price!: number;

  @prop({
    required: true,
    default: [],
  })
  public goods!: string[];

  @prop({
    required: true,
    default: DefaultOffer.COMMENTS_COUNT,
  })
  public commentsCount!: number;

  @prop({
    required: true,
    type: () => Object,
    default: {},
  })
  public location!: Location;

  @prop({
    ref: UserEntity,
    required: true,
    _id: false,
  })
  public host!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
