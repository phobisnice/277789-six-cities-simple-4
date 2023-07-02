import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(data);
    this.logger.info(`New offer created: ${data.title}`);
    return offer;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offers = await this.offerModel.aggregate([
      { $match: { $expr : { $eq: ['$_id' , { $toObjectId: id }] } } },
      {
        $lookup: {
          from: 'comments',
          let: { offerId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
          ],
          as: 'comments'
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { host: '$host' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$host', '$_id'] } } }
          ],
          as: 'host',
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id'},
          commentsCount: { $size: '$comments'},
          rating: {
            $cond: {
              if: { $eq: [{ $size: '$comments' }, 0] },
              then: 0,
              else: { $round: [{ $divide: [ { $sum: '$comments.rating' },{ $size: '$comments' }] }, 1] }
            }
          }
        },
      },
      {
        $unset: [
          'comments',
          'host._id',
          'host._password',
          'host.createdAt',
          'host.email',
          'host.updatedAt',
          'host.__v',
        ]
      },
    ]).exec();

    return offers.length
      ? {
        ...offers[0],
        host: {
          ...offers[0].host[0],
        }
      } : null;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: {$expr: { $eq: ['$$offerId', '$offerId'] } } },
            ],
            as: 'comments'
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id'},
            host: { $toString: '$host'},
            commentsCount: { $size: '$comments'},
            rating: {
              $cond: {
                if: { $eq: [{$size: '$comments'}, 0] },
                then: 0,
                else: { $round: [{$divide: [ {$sum: '$comments.rating'},{ $size: '$comments'}]}, 1]}
              }
            }
          },
        },
        { $limit: limit },
        { $sort: {'createdAt': SortType.Down} },
        { $unset: ['comments'] }
      ]);
  }

  public async deleteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(id)
      .populate(['host'])
      .exec();
  }

  public async updateById(id: string, data: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate(['host'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentsCount: 1,
        }
      })
      .populate(['host'])
      .exec();
  }
}
