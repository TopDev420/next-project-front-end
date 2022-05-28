import { Model } from 'types/models/Model';

export type ReservationGuestDetail = {
  reservationId: number;
  userId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  imageUrl?: string | null;
} & Model;
