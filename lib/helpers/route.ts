import { BlogSearchQuery } from 'lib/forms/blog';
import { HomePageSearchInput } from 'lib/forms/search';
import { serializeToQuery } from 'lib/helpers/url';
import { convertSearchInputToQuery } from 'lib/transformers/search';
import { StepType } from 'types/ui/Stepper';

export const getMyPagePropertyStepRoute = (
  propertyId: number,
  step: StepType,
) => `/my-page/property/${propertyId}/${step}`;

export const getMyPagePropertyCalendarRoomRoute = (
  propertyId: number,
  roomId: number,
) => `${getMyPagePropertyStepRoute(propertyId, 'calendar')}/${roomId}`;

export const getPublicPropertyShowRoute = (id: number | string, slug: string) =>
  `/rooms/${id}/${slug || ''}`;

export const getSearchRoute = (input: HomePageSearchInput = {}) => {
  const query = convertSearchInputToQuery(input);
  return `/search?${serializeToQuery(query)}`;
};

export const getBlogRoute = (slug: string) => `/blogs/${slug}`;

export const getBlogSearchRoute = (query?: BlogSearchQuery) =>
  !query ? '/blogs' : `/blogs?${serializeToQuery(query)}`;
