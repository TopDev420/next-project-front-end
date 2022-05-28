import dayjs from 'dayjs';
import _ from 'lodash';
import { GuestReservationInput, ReservationInput } from 'lib/forms/reservation';
import { del, get, post, put } from 'lib/helpers/api';
import { Reservation, ReservationCalculation } from 'types/models/Reservation';
import { PaginationInput, Pagination } from 'types/Pagination';
import {
  MyPageReservationResource,
  MyPageTripResource,
} from 'types/resources/Reservation';
import {
  RESERVATION_STATUS_ACCEPTED,
  RESERVATION_STATUS_PENDING,
} from 'constants/master-types';

const normalizeInput = (input: ReservationInput): ReservationInput => ({
  ..._.omit(input, 'id', 'status', 'rooms'),
  checkedInAt: dayjs(input.checkedInAt).startOf('date').toDate(),
  checkedOutAt: dayjs(input.checkedOutAt).startOf('date').toDate(),
  roomsRequested:
    !input?.id && !input?.roomsRequested
      ? input.roomsIds?.length || 1
      : input.roomsRequested,
});

export const showReservation = (id: number) =>
  get<Reservation>(`reservation/${id}`);

export const saveReservation = (input: ReservationInput) => {
  if (input.id) {
    return put<Reservation>(`reservation/${input.id}`, normalizeInput(input));
  }

  return post<Reservation>('reservation', normalizeInput(input));
};

export const deleteReservation = async (id: number) => {
  await del(`reservation/${id}`);
  return id;
};

export const acceptReservation = async (id: number, roomIds?: number[]) => ({
  id,
  status: (
    await post<{ status: number }>(
      `reservation/${id}/accept`,
      roomIds ? { roomIds } : undefined,
    )
  ).status,
});

export const declineReservation = async (id: number) => ({
  id,
  status: (await post<{ status: number }>(`reservation/${id}/decline`)).status,
});

export const cancelReservation = async (id: number) => ({
  id,
  status: (await post<{ status: number }>(`reservation/${id}/cancel`)).status,
});

export type ReservationAction = 'accept' | 'decline' | 'cancel';

export const processReservation = (input: {
  id: number;
  action: ReservationAction;
  roomIds?: number[];
}) => {
  const { id, action, roomIds } = input;
  switch (action) {
    case 'accept':
      return acceptReservation(id, roomIds);
    case 'decline':
      return declineReservation(id);
    default:
      return cancelReservation(id);
  }
};

export const calculate = (input: GuestReservationInput) => {
  const url = `property/${input.propertyId}/calculation`;
  return post<ReservationCalculation>(url, _.omit(input, 'propertyId'));
};

export const guestReservation = (input: GuestReservationInput) => {
  const url = `property/${input.propertyId}/reservation`;
  return post<Reservation>(url, _.omit(input, 'propertyId'));
};

export const getMyPageReservations = (input: PaginationInput) => {
  const url = `my-page/reservation`;
  return get<Pagination<MyPageReservationResource>>(url, input);
};

export const getMyPageTrips = (input: PaginationInput) => {
  const url = `my-page/trip`;
  return get<Pagination<MyPageTripResource>>(url, input);
};

export const cancelOrDeleteReservation = ({
  id,
  status,
}: {
  id: number;
  status: number;
}) => {
  if (status === RESERVATION_STATUS_PENDING) {
    return deleteReservation(id);
  }
  if (status === RESERVATION_STATUS_ACCEPTED) {
    return cancelReservation(id);
  }

  throw new Error('Only pending or accepted reservations can be cancelled');
};
