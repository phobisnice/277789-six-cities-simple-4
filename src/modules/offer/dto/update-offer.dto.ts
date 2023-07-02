import { City } from '../../../types/city.type.js';
import { OfferKind } from '../../../types/offer-kind.type.js';
import { Location } from '../../../types/location.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: OfferKind;
  public rooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public location?: Location;
}
