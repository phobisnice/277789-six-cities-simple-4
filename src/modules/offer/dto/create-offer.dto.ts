import { City } from '../../../types/city.type.js';
import { OfferKind } from '../../../types/offer-kind.type.js';
import { Location } from '../../../types/location.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public createdDate!: Date;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: OfferKind;
  public rooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public commentsCount!: number;
  public location!: Location;
  public host!: string;
}
