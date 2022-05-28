import { Model } from 'types/models/Model';
import { ReservationGuestDetail } from 'types/models/ReservationGuestDetail';
import { Room } from 'types/models/Room';
import { Order } from 'types/models/Order';

export type Reservation = {
  propertyId: number;
  guestId?: number | null;
  checkedInAt: string;
  checkedOutAt: string;
  guests: number;
  status: number;
  metadata?: Record<string, any> | null;
  reservationGuestDetail?: ReservationGuestDetail | null;
  rooms: Room[];
} & Model;

export type ReservationCalculation =
  | {
      flexible: true;
    }
  | Order;
