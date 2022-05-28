export type GetCalendarInput = {
  from: number;
  to: number;
  propertyId: number;
  type: 'MANAGEMENT' | 'VIEW';
  roomId: number | undefined;
};
