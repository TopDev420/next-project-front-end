export type CalendarSlot = {
  date: string;
  price: number;
  isAvailable: boolean;
  capacity: number;
};

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resourceId?: number;
  metadata?: {
    id?: number;
    type?: string;
    resourceId?: number;
    resourceType?: string;
    status?: number;
    roomsIds?: number[];
    userName?: string;
    userAvatar?: string | null;
  };
};

export type Calendar = {
  slots: CalendarSlot[];
  events: CalendarEvent[];
};
