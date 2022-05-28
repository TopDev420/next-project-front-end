import dayjs from 'dayjs';
import { BlockInput } from 'lib/forms/block';
import { Block } from 'types/models/Block';
import { CalendarEvent } from 'types/models/Calendar';

export const convertToEventInput = (block: Block): BlockInput => ({
  id: block.id,
  propertyId: block.propertyId,
  name: block.name || '',
  startedAt: dayjs(block.startedAt).toDate(),
  endedAt: dayjs(block.endedAt).toDate(),
});

export const convertToCalendarEvent = (block: Block): CalendarEvent => ({
  title: block.name,
  start: dayjs(block.startedAt).toDate(),
  end: dayjs(block.endedAt).toDate(),
  allDay: false,
  resourceId: block.propertyId,
  metadata: {
    id: block.id,
    type: 'Block',
    resourceId: block.propertyId,
    resourceType: 'Property',
  },
});
