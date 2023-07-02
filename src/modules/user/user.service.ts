import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { UserServiceInterface } from './user-service.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UpdateUserDto from './dto/update-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(data: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(data);
    user.setPassword(data.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async findOrCreate(data: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(data.email);

    return existedUser ?? this.create(data, salt);
  }

  public async updateById(id: string, data: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
