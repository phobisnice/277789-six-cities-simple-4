import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constant.js';
import { SortType } from '../../types/sort-type.enum.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(data: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(data);
    return comment.populate(['host']);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .populate('host')
      .sort({
        createdAt: SortType.Down,
      })
      .limit(DEFAULT_COMMENT_COUNT);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();
    return result.deletedCount;
  }

  public async updateRatingByOfferId(offerId: string): Promise<void> {
    await this.commentModel.aggregate([
      {
        $match: {
          offerId: { $toObjectId: offerId },
        },
      },
      {
        $group: {
          _id: { $toObjectId: offerId },
          avg: { $avg: '$rating' },
        },
      },
      {
        $project: {
          _id: '$_id',
          rating: { $round: [ '$avg', 1 ] },
        },
      },
      {
        $merge: {
          into: 'offers',
          on: '_id',
          whenMatched: 'merge',
          whenNotMatched: 'discard',
        },
      },
    ]).exec();
  }
}
