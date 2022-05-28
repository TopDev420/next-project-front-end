import * as yup from 'yup';

export type RkRoomInput = {
  roomId?: number | null;
  rkId?: string;
  propertyId: number | null;
};
export type RkUserInput = {
  propertyId: number | null;
  userRkId: string;
  roomRkId?: string | null;
};
export const RkRoomSchema: yup.SchemaOf<RkRoomInput> = yup.object().shape({
  propertyId: yup.number().required(),
  roomId: yup.number().required(),
  rkId: yup.string().required().max(191).label('Reservation Key Id'),
});
export const RkUserSchema: yup.SchemaOf<RkUserInput> = yup.object().shape({
  userRkId: yup.string().required().max(191).label('User Reservation Key'),
  roomRkId: yup.string().nullable().max(191).label('Property Reservation Key'),
});
