import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { OfferKind } from '../../types/offer-kind.type.js';
import { ProfileKind } from '../../types/profile-kind.type.js';

export function checkEmptyProperty(property: string): boolean {
  return property !== '@@@';
}

export function createOffer(data: string): Offer {
  const [
    title,
    description,
    createDate,
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
  ] = data.replace('\n', '').split('\t');

  const [latitude, longitude] = location.split(';')
    .map((item) => Number(item));

  return {
    title,
    description,
    createdDate: new Date(createDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true' ?? false,
    rating: Number(rating),
    type: type as OfferKind,
    rooms: Number(rooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';'),
    host: {
      name,
      email,
      avatar: checkEmptyProperty(avatar) ? avatar : undefined,
      type: userType as ProfileKind,
    },
    commentsCount: Number(commentsCount),
    location: {
      longitude,
      latitude,
    }
  };
}
