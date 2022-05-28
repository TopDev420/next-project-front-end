import { Bathroom } from 'types/models/Bathroom';
import { Bedroom } from 'types/models/Bedroom';
import { Charge } from 'types/models/Charge';
import { Discount } from 'types/models/Discount';
import { GuestCharge } from 'types/models/GuestCharge';
import { Image } from 'types/models/Image';
import { Location } from 'types/models/Location';
import { MasterType } from 'types/models/MasterType';
import { Model } from 'types/models/Model';
import { Price } from 'types/models/Price';
import { PropertyDescription } from 'types/models/PropertyDescription';
import { PropertyTerm } from 'types/models/PropertyTerm';
import { Room } from 'types/models/Room';
import { Subscription } from 'types/models/Subscription';
import { User } from 'types/models/User';
import { HasSeoMeta } from 'types/models/HasSeoMeta';

enum PropertyStatus {
  PUBLIC = 1,
  DRAFT = 0,
}

export type Property = {
  propertyTypeId: number;
  propertyType?: MasterType | null;
  guests: number;
  userId: number;
  user: User | null;
  title: string;
  status: PropertyStatus;
  location?: Location | null;
  amenitiesIds?: number[] | null;
  bedrooms?: Bedroom[] | null;
  bathrooms?: Bathroom[] | null;
  propertyDescription?: PropertyDescription | null;
  images?: Image[] | null;
  video?: string | null;
  bpg?: boolean | null;
  charges?: Charge[] | null;
  discounts?: Discount[] | null;
  price?: Price | null;
  guestCharge?: GuestCharge | null;
  roomsCount: number;
  slug: string | null;
  room: Room;
  propertyTerm?: PropertyTerm | null;
  subscription?: Subscription | null;
} & Model &
  HasSeoMeta;
