import {
  GetCouponInput,
  MyPageListingInput,
  NewPropertyInput,
  RoomsCsvInput,
  UpdatePropertyAmenitiesInput,
  UpdatePropertyBpgInput,
  UpdatePropertyDescriptionInput,
  UpdatePropertyVideoInput,
  UpdateStatusInput,
  UpdateTermsInput,
} from 'lib/forms/property';
import {
  get,
  getServerSidePropsRequestHeader,
  post,
  put,
} from 'lib/helpers/api';
import { GetServerSidePropsContext } from 'next';
import _ from 'lodash';
import { Property } from 'types/models/Property';
import { PropertyDescription } from 'types/models/PropertyDescription';
import { Location } from 'types/models/Location';
import { Input } from 'types/models/Input';
import { UpdatePropertyImagesInput } from 'lib/forms/image';
import { Image } from 'types/models/Image';
import { GuestChargeInput } from 'lib/forms/guest-charge';
import { GuestCharge } from 'types/models/GuestCharge';
import { PriceInput } from 'lib/forms/price';
import { Price } from 'types/models/Price';
import { GetCalendarInput } from 'lib/forms/calendar';
import { Calendar } from 'types/models/Calendar';
import { convertToPHPTimestamp } from 'lib/helpers/date';
import { normalize } from 'lib/transformers/calendar-event';
import { Pagination, PaginationInput } from 'types/Pagination';
import { RkRoom, Room } from 'types/models/Room';
import { ListRoomInput } from 'lib/forms/room';
import { PropertyTerm } from 'types/models/PropertyTerm';
import { HomePageSearchQuery } from 'lib/forms/search';
import {
  MyPagePropertyResource,
  PropertyDetailResource,
  PropertySearchResource,
} from 'types/resources/Property';
import { Coupon } from 'types/models/Coupon';
import { snakeCaseKeys } from 'lib/helpers/object';
import { PROPERTY_STATUS_PUBLIC } from 'constants/master-types';
import { RkRoomInput, RkUserInput } from 'lib/forms/rkroom';

export const searchProperty = async (
  input: PaginationInput<HomePageSearchQuery>,
  req?: GetServerSidePropsContext['req'],
) => {
  const param = snakeCaseKeys(input);
  if (req) {
    return get<Pagination<PropertySearchResource>>(
      'property',
      param,
      getServerSidePropsRequestHeader(req),
    );
  }
  return get<Pagination<PropertySearchResource>>('property', param);
};

export const createProperty = async (model: NewPropertyInput) =>
  post<Property>('property', model);

export const showProperty = async <
  T extends Property | PropertyDetailResource = Property,
>(
  id: number,
  req?: GetServerSidePropsContext['req'],
  detail?: boolean,
) => {
  const url = `property/${id}`;
  const params = detail ? { detail: true } : undefined;
  if (req) {
    return get<T>(url, params, getServerSidePropsRequestHeader(req));
  }

  return get<T>(url, params);
};

export const showPropertyRoom = async (
  id: number,
  roomId: number,
  req?: GetServerSidePropsContext['req'],
) => {
  const url = `property/${id}/room/${roomId}`;
  if (req) {
    return get<{ property: Property; room: Room }>(
      url,
      undefined,
      getServerSidePropsRequestHeader(req),
    );
  }

  return get<{ property: Property; room: Room }>(url);
};

export const updatePropertyDescription = async (
  input: UpdatePropertyDescriptionInput,
) => {
  const url = `property/${input.propertyId}/property-description`;
  return put<PropertyDescription>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyLocation = (
  input: Input<Location> & { propertyId: number },
) => {
  const url = `property/${input.propertyId}/location`;
  return put<Location>(url, input);
};

export const updateProperyAmenities = (input: UpdatePropertyAmenitiesInput) => {
  const url = `property/${input.propertyId}/amenity`;
  return put<Array<number>>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyImages = (input: UpdatePropertyImagesInput) => {
  const url = `property/${input.propertyId}/image`;
  const formData = new FormData();
  formData.set('_method', 'PUT');
  input.images.forEach((image, index) => {
    const namespace = `images[${index}]`;
    const keys = ['id', 'file', 'alt'] as const;
    keys.forEach((key) => {
      if (image[key]) {
        formData.set(`${namespace}[${key}]`, image[key] as any);
      }
    });
  });
  return post<Image[]>(url, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const updatePropertyVideo = (input: UpdatePropertyVideoInput) => {
  const url = `property/${input.propertyId}/video`;
  return put<{ video: string | null }>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyBpg = (input: UpdatePropertyBpgInput) => {
  const url = `property/${input.propertyId}/bpg`;
  return put<{ bpg: boolean }>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyGuestCharge = (input: GuestChargeInput) => {
  const url = `property/${input.propertyId}/guest-charge`;
  return put<GuestCharge>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyPrice = (input: PriceInput) => {
  const url = `property/${input.propertyId}/price`;
  return put<Price>(url, _.omit(input, 'propertyId'));
};

export const updatePropertyTerms = (input: UpdateTermsInput) => {
  const url = `property/${input.propertyId}/terms`;
  return put<PropertyTerm>(url, _.omit(input, 'propertyId'));
};

export const getCalendar = async (input: GetCalendarInput) => {
  const { propertyId, ...param } = input;
  let url: string;
  if (input.roomId) {
    url = `room/${input.roomId}/calendar`;
  } else {
    url = `property/${propertyId}/calendar`;
  }

  param.from = convertToPHPTimestamp(param.from);
  param.to = convertToPHPTimestamp(param.to);

  if (!param.roomId) {
    delete param.roomId;
  }

  const calendar = await get<Calendar>(url, param);
  calendar.events = calendar.events.map(normalize);
  return calendar;
};

export const listRooms = async (input: ListRoomInput) => {
  const url = `property/${input.propertyId}/room`;

  return get<Pagination<Room>>(url, {
    page: input.page || 1,
    search: input.search || '',
  });
};

export const listRkRooms = async (input: ListRoomInput) => {
  const url = `property/${input.propertyId}/rk`;
  return get<Pagination<RkRoom>>(url, {
    page: input.page || 1,
    search: input.search || '',
  });
};
export const saveRkRoom = async (input: RkRoomInput) => {
  const url = `property/${input.propertyId}/rk`;
  return put<RkRoom>(url, input);
};

export const getRkUser = (propertyId: number) => {
  const url = `property/${propertyId}/rkuser`;
  return get<RkUserInput>(url);
};
export const saveRkUser = (input: RkUserInput) => {
  const url = `property/${input.propertyId}/rkuser`;
  return put<RkUserInput>(url, input);
};

export const roomsCsv = async (input: RoomsCsvInput) => {
  const url = `property/${input.propertyId}/rooms-csv`;

  const formData = new FormData();
  formData.append('file', input.file);

  await post<Image[]>(url, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return true;
};

export const getCouponInfo = (input: GetCouponInput) => {
  const url = `property/${input.propertyId}/coupon`;
  return get<Coupon>(url, _.omit(input, 'propertyId'));
};

export const updateStatus = async (input: UpdateStatusInput) => {
  const url = `property/${input.propertyId}/status`;
  const result = await put<{ status: number }>(
    url,
    _.omit(input, 'propertyId'),
  );
  return { propertyId: input.propertyId, status: result.status };
};

export const getMyPageListing = (input: MyPageListingInput) => {
  const url = `my-page/property/${
    input.status === PROPERTY_STATUS_PUBLIC ? 'listed' : 'unlisted'
  }`;
  return get<Pagination<MyPagePropertyResource>>(url, _.omit(input, 'status'));
};
