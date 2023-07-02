import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { CommentLimit } from '../../types/comment-limit.enum.js';
import { OfferLimit } from '../../types/offer-limit.enum.js';
import { DefaultOffer } from '../../types/default-offer.enum.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    default: '',
    min: CommentLimit.MIN_LENGTH,
    max: CommentLimit.MAX_LENGTH,
  })
  public text!: string;

  @prop({
    required: true,
    default: DefaultOffer.RATING,
    min: OfferLimit.MIN_RATING_VALUE,
    max: OfferLimit.MAX_RATING_VALUE,
  })
  public rating!: number;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public host!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
