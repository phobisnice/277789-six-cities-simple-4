import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { Profile } from '../../types/profile.type.js';
import { ProfileKind } from '../../types/profile-kind.type.js';
import { createSHA256 } from '../../core/helpers/crypto.js';

const { prop, modelOptions } = typegoose;

const DEFAULT_AVATAR = 'https://placehold.co/300x300';
const DEFAULT_PROFILE_KIND: ProfileKind = 'normal';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements Profile {
  @prop({ unique: true, required: true})
  public email!: string;

  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ required: false, default: DEFAULT_AVATAR })
  public avatar?: string;

  @prop({ required: true, default: DEFAULT_PROFILE_KIND })
  public type!: ProfileKind;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(profileData: Profile) {
    super();

    this.email = profileData.email;
    this.name = profileData.name;
    this.avatar = profileData.avatar;
    this.type = profileData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
