import { Room } from 'types/models/Room';
import * as yup from 'yup';

export type ReservationInput = {
  id?: number | null;
  propertyId: number;
  guestId?: number | null;
  checkedInAt: Date;
  checkedOutAt: Date;
  guests: number;
  note?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  status?: number | null;
  roomsIds?: number[];
  rooms?: Room[];
  roomsRequested?: number;
};

// @ts-ignore
export const ReservationSchema: yup.SchemaOf<ReservationInput> = yup
  .object()
  .shape({
    id: yup.number().nullable(),
    propertyId: yup.number().required().label('Property Id'),
    userId: yup.number().nullable().label('User Id'),
    checkedInAt: yup.date().required().label('Check In Date'),
    checkedOutAt: yup
      .date()
      .required()
      .min(yup.ref('checkedInAt'))
      .label('Check Out Date'),
    guests: yup.number().required().label('Guests'),
    note: yup.string().nullable().max(99999).label('Note'),
    firstName: yup.string().nullable().max(99).label('First Name'),
    lastName: yup.string().nullable().max(99).label('Last Name'),
    email: yup.string().nullable().max(100).label('Email'),
    phone: yup.string().nullable().max(16).label('Phone'),
    address: yup.string().nullable().max(999).label('Address'),
    status: yup.number().nullable(),
    roomsIds: yup.array().of(yup.number()).nullable().label('Rooms'),
    roomsRequested: yup.number().nullable().label('Required Number of Rooms'),
    rooms: yup.array().nullable(),
  });

export type GuestReservationInput = {
  propertyId: number;
  checkedInAt: Date;
  checkedOutAt: Date;
  guests: number;
  roomsRequested?: number;
  chargeIds?: number[];
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export const GuestReservationSchema = yup.object().shape({
  propertyId: yup.number().required(),
  checkedInAt: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required()
    .label('Check In Date'),
  checkedOutAt: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required()
    .min(yup.ref('checkedInAt'))
    .label('Check Out Date'),
  guests: yup.number().required().label('Guests'),
  roomsRequested: yup.number().nullable().label('Rooms'),
  chargeIds: yup.array().of(yup.number()).nullable().label('Charges'),
  firstName: yup.string().nullable().max(99).label('First Name'),
  lastName: yup.string().nullable().max(99).label('Last Name'),
  email: yup.string().nullable().max(100).label('Email'),
  phone: yup.string().nullable().max(16).label('Phone'),
  address: yup.string().nullable().max(999).label('Address'),
});
