import * as yup from 'yup';

export type BlockInput = {
  id?: number | null;
  propertyId: number;
  roomId?: number | null;
  name?: string | null;
  startedAt: Date;
  endedAt: Date;
};

export const BlockSchema: yup.SchemaOf<BlockInput> = yup.object().shape({
  id: yup.number().nullable(),
  propertyId: yup.number().required().label('Property Id'),
  roomId: yup.number().nullable().label('Room Id'),
  name: yup.string().nullable().max(99),
  startedAt: yup.date().required().label('Start Date'),
  endedAt: yup.date().required().min(yup.ref('startedAt')).label('End Date'),
});
