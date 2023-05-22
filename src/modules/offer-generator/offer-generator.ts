import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import {
  generateRandomNumber,
  getNearRandomCoordinate,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../core/helpers/index.js';
import { OfferLimit } from '../../types/offer-limit.enum.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  private readonly emptyValue = '@@@';
  constructor(private readonly mockData: MockData) {}
  public generate(): string {
    const title = getRandomItem(this.mockData.titles).slice(0, OfferLimit.MAX_TITLE_LENGTH);
    const description = getRandomItem(this.mockData.descriptions).slice(0, OfferLimit.MAX_DESCRIPTION_LENGTH);
    const createData = dayjs().subtract(
      generateRandomNumber(OfferLimit.FIRST_WEEK_DAY, OfferLimit.LAST_WEEK_DAY),
      'day'
    ).toISOString();
    const fullCity = getRandomItem(this.mockData.cities);
    const city = fullCity.name;
    const previewImage = this.mockData.previewImage;
    const images = new Array(OfferLimit.IMAGES_LENGTH).fill(this.mockData.fullImage).join(';');
    const isPremium = getRandomBoolean();
    const rating = generateRandomNumber(
      OfferLimit.MIN_RATING_VALUE,
      OfferLimit.MAX_RATING_VALUE,
      1,
    );
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomNumber(OfferLimit.MIN_ROOMS_COUNT, OfferLimit.MAX_ROOMS_COUNT);
    const maxAdults = generateRandomNumber(OfferLimit.MIN_ADULTS_COUNT, OfferLimit.MAX_ADULTS_COUNT);
    const price = generateRandomNumber(OfferLimit.MIN_PRICE, OfferLimit.MAX_PRICE);
    const goods = getRandomItems(this.mockData.goods).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomBoolean() ? this.mockData.avatar : this.emptyValue;
    const userType = getRandomItem(this.mockData.userTypes);
    const commentsCount = generateRandomNumber(OfferLimit.MIN_COMMENTS_COUNT, OfferLimit.MAX_COMMENTS_COUNT);
    const location = [
      getNearRandomCoordinate(fullCity.location.latitude),
      getNearRandomCoordinate(fullCity.location.longitude),
    ].join(';');

    return [
      title,
      description,
      createData,
      city,
      previewImage,
      images,
      isPremium,
      rating,
      type,
      rooms,
      maxAdults,
      price,
      goods,
      name,
      email,
      avatar,
      userType,
      commentsCount,
      location,
    ].join('\t');
  }
}
