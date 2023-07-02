import { ProfileKind } from '../../../types/profile-kind.type.js';

export default class UpdateUserDto {
  public email?: string;
  public name?: string;
  public avatar?: string;
  public type?: ProfileKind;
}
