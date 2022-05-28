import { Image } from 'types/models/Image';
import { Model } from 'types/models/Model';
import { Property } from 'types/models/Property';
import { ReservationDetail } from 'types/models/ReservationDetail';
import { ReservationGuestDetail } from 'types/models/ReservationGuestDetail';
import { Room } from 'types/models/Room';

export type RecentReservationResource = {
  checkedInAt: string;
  checkedOutAt: string;
  guestId: number | null;
  guests: number;
  hostId: number;
  metadata: any;
  property: {
    id: number;
    image: Image | null;
    title: string;
    slug: string;
  };
  propertyId: number;
  reservationDetail: ReservationDetail;
  reservationGuestDetail: ReservationGuestDetail;
  roomsRequested: number;
  status: number;
} & Model;

export type RecentTripResource = RecentReservationResource & {
  host: {
    id: number;
    fullName: string;
    imageUrl: string | null;
  };
};

export type MyPageReservationResource = RecentReservationResource & {
  rooms: Room[];
  property: Property;
};

export type MyPageTripResource = RecentReservationResource & {
  host: {
    id: number;
    fullName: string;
    email?: string;
    phone?: string;
    imageUrl?: string | null;
  };
};
