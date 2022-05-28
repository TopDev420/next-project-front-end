import {
  RESERVATION_STATUS_ACCEPTED,
  RESERVATION_STATUS_CANCELLED_BY_GUEST,
  RESERVATION_STATUS_CANCELLED_BY_HOST,
  RESERVATION_STATUS_DECLINED,
  RESERVATION_STATUS_PENDING,
} from 'constants/master-types';
import theme from 'constants/theme';
import dayjs from 'dayjs';
import { ReservationInput } from 'lib/forms/reservation';
import { getFullName } from 'lib/transformers/name';
import { CalendarEvent } from 'types/models/Calendar';
import { Reservation } from 'types/models/Reservation';
import { MyPageReservationResource } from 'types/resources/Reservation';

export const formatDateRange = (reservation?: {
  checkedInAt: any;
  checkedOutAt: any;
}) =>
  reservation
    ? `${dayjs(reservation.checkedInAt).format('MM/DD/YYYY')} ~ ${dayjs(
        reservation.checkedOutAt,
      ).format('MM/DD/YYYY')}`
    : '';

export const getTitle = (reservation: Reservation) => {
  const dateRangeFormat = formatDateRange(reservation);
  const fullName = getFullName(reservation.reservationGuestDetail);

  if (!fullName) {
    return dateRangeFormat;
  }

  return `${fullName} ${dateRangeFormat}`;
};

export const convertToCalendarEvent = (
  reservation: Reservation,
): CalendarEvent => {
  const title = getTitle(reservation);
  return {
    title,
    start: dayjs(reservation.checkedInAt).toDate(),
    end: dayjs(reservation.checkedOutAt).toDate(),
    allDay: false,
    resourceId: reservation.propertyId,
    metadata: {
      id: reservation.id,
      type: 'Reservation',
      resourceId: reservation.propertyId,
      resourceType: 'Property',
      status: reservation.status,
    },
  };
};

export const convertToEventInput = (
  reservation: Reservation,
): ReservationInput => ({
  ...reservation,
  id: reservation.id,
  propertyId: reservation.propertyId,
  guestId: reservation.guestId,
  checkedInAt: dayjs(reservation.checkedInAt).toDate(),
  checkedOutAt: dayjs(reservation.checkedOutAt).toDate(),
  guests: reservation.guests,
  note: reservation.metadata?.note || '',
  firstName: reservation.reservationGuestDetail?.firstName || '',
  lastName: reservation.reservationGuestDetail?.lastName || '',
  email: reservation.reservationGuestDetail?.email || '',
  phone: reservation.reservationGuestDetail?.phone || '',
  address: reservation.reservationGuestDetail?.address || '',
  status: reservation.status,
  roomsIds: reservation.rooms?.map(({ id }) => id),
});

export const canHostDeleteReservation = (reservation?: {
  id?: number | null;
  guestId?: number | null;
  status?: number | null;
}) =>
  reservation?.id &&
  !reservation?.guestId &&
  reservation?.status !== RESERVATION_STATUS_ACCEPTED &&
  reservation?.status !== RESERVATION_STATUS_CANCELLED_BY_GUEST;

export const getTotalNights = (checkIn: Date, checkOut: Date) =>
  dayjs(checkOut).diff(checkIn, 'day');

export const getStatusDisplayText = (reservation?: {
  reservationStatusId: number;
}) => {
  if (!reservation) {
    return '';
  }

  switch (reservation.reservationStatusId) {
    case RESERVATION_STATUS_PENDING:
      return 'Pending';
    case RESERVATION_STATUS_ACCEPTED:
      return 'Accepted';
    case RESERVATION_STATUS_DECLINED:
      return 'Declined';
    case RESERVATION_STATUS_CANCELLED_BY_HOST:
    case RESERVATION_STATUS_CANCELLED_BY_GUEST:
      return 'Cancelled';
    default:
      return 'Invalid';
  }
};

export const getStatusDisplayColor = (reservation?: {
  reservationStatusId: number;
}) => {
  switch (reservation?.reservationStatusId) {
    case RESERVATION_STATUS_PENDING:
      return theme?.colors?.blue?.[600];
    case RESERVATION_STATUS_ACCEPTED:
      return theme?.colors?.green?.[600];
    default:
      return theme?.colors?.gray?.[600];
  }
};

export const convertResourceToInput = (
  model: MyPageReservationResource,
): ReservationInput => ({
  id: model.id,
  propertyId: model.propertyId,
  checkedInAt: dayjs(model.checkedInAt).toDate(),
  checkedOutAt: dayjs(model.checkedOutAt).toDate(),
  guests: model.guests,
  firstName: model.reservationGuestDetail?.firstName,
  lastName: model.reservationGuestDetail?.lastName,
  email: model.reservationGuestDetail?.email,
  phone: model.reservationGuestDetail?.phone,
  address: model.reservationGuestDetail?.address,
  status: model.status,
  roomsRequested: model.roomsRequested,
});

export const canGuestCancelOrDelete = (status: number) =>
  [RESERVATION_STATUS_ACCEPTED, RESERVATION_STATUS_PENDING].includes(status);
