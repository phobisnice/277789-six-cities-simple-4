import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentServiceInterface {
  create(data: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number>;
  updateRatingByOfferId(offerId: string): Promise<void>;
}
