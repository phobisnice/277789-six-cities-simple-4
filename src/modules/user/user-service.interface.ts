import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';

export interface UserServiceInterface {
  create(data: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(data: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(id: string, data: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
