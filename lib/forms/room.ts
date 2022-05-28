import * as yup from 'yup';
import { PaginationInput } from 'types/Pagination';

export type ListRoomInput = PaginationInput<{
  propertyId: number;
  search?: string;
}>;

export type RoomInput = {
  id?: number | null;
  propertyId: number;
  title: string;
  icalFeedUrl?: string | null;
};

export const RoomSchema: yup.SchemaOf<RoomInput> = yup.object().shape({
  id: yup.number().nullable(),
  propertyId: yup.number().required(),
  title: yup.string().required().max(191).label('Title'),
  icalFeedUrl: yup.string().nullable().max(9999).label('iCal Feed URL'),
});
