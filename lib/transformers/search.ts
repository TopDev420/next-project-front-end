import dayjs from 'dayjs';
import { Range } from 'react-date-range';
import { HomePageSearchInput, HomePageSearchQuery } from 'lib/forms/search';
import { suppress } from 'lib/helpers/support';
import _ from 'lodash';
import { arrayEqualsCanonically } from 'lib/helpers/array';
import { dateEqualsCanonically } from 'lib/helpers/date';
import { boundsEqualCanonically } from 'lib/google/maps';

const extraFields = [
  'bedsCount',
  'bedroomsCount',
  'bathroomsCount',
  'propertyTypeIds',
  'amenitiesIds',
] as const;

export const convertSearchInputToQuery = (
  input: HomePageSearchInput,
): HomePageSearchQuery => {
  const query: HomePageSearchQuery = {};
  if (input.checkIn) {
    const checkIn = dayjs(input.checkIn).format('YYYY-MM-DD');
    if (checkIn && checkIn !== 'Invalid Date') {
      query.checkIn = checkIn;
    }
  }
  if (input.checkOut) {
    const checkOut = dayjs(input.checkOut).format('YYYY-MM-DD');
    if (checkOut && checkOut !== 'Invalid Date') {
      query.checkOut = checkOut;
    }
  }
  if (input.guests) {
    query.guests = input.guests;
  }
  if (input.boundingBox && Array.isArray(input.boundingBox)) {
    query.boundingBox = input.boundingBox;
  }
  if (input.formattedAddress) {
    query.address = input.formattedAddress;
  }

  extraFields.forEach((field) => {
    if (input[field]) {
      query[field] = input[field];
    }
  });

  return query;
};

export const convertQueryToSearchInput = (
  query: HomePageSearchQuery,
): HomePageSearchInput => {
  const input: HomePageSearchInput = {};
  if (!query) {
    return input;
  }
  if (query.checkIn) {
    suppress(() => {
      input.checkIn = dayjs(query.checkIn).toDate();
    });
  }
  if (query.checkOut) {
    suppress(() => {
      input.checkOut = dayjs(query.checkOut).toDate();
    });
  }
  if (query.guests) {
    input.guests = Number(query.guests);
  }
  if (query.boundingBox && Array.isArray(query.boundingBox)) {
    input.boundingBox = query.boundingBox;
  }
  if (query.address) {
    input.formattedAddress = query.address;
  }
  extraFields.forEach((field) => {
    if (query[field]) {
      input[field] = query[field];
    }
  });
  return input;
};

export const convertCheckInCheckOutToRanges = (
  checkIn: Date | undefined,
  checkOut: Date | undefined,
) => {
  if (!checkIn && !checkOut) {
    return [
      {
        startDate: null,
        endDate: new Date(''),
        key: 'selection',
      },
    ];
  }
  const range: Range = {
    key: 'selection',
  };
  if (checkIn) {
    range.startDate = dayjs(checkIn).toDate();
  }
  if (checkOut) {
    range.endDate = dayjs(checkOut).toDate();
  }
  return [range];
};

export const diffSearchInputs = (
  prev: HomePageSearchInput,
  next: HomePageSearchInput,
) => {
  const diff: Array<keyof HomePageSearchInput> = [];
  (
    [
      'formattedAddress',
      'guests',
      'bedsCount',
      'bedroomsCount',
      'bathroomsCount',
    ] as const
  ).forEach((key) => {
    if (prev?.[key] !== next?.[key]) {
      diff.push(key);
    }
  });
  if (!arrayEqualsCanonically(prev?.amenitiesIds, next?.amenitiesIds)) {
    diff.push('amenitiesIds');
  }
  if (!arrayEqualsCanonically(prev?.propertyTypesIds, next?.propertyTypesIds)) {
    diff.push('propertyTypesIds');
  }
  if (!dateEqualsCanonically(prev?.checkIn, next?.checkIn)) {
    diff.push('checkIn');
  }
  if (!dateEqualsCanonically(prev?.checkOut, next?.checkOut)) {
    diff.push('checkOut');
  }
  if (!boundsEqualCanonically(prev?.boundingBox, next?.boundingBox)) {
    diff.push('boundingBox');
  }
  return diff;
};
