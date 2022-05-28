/* eslint-disable no-param-reassign */
import { EventModelType } from 'components/pages/my-page/property/Availibility/EventModal/type';
import dayjs from 'dayjs';
import produce from 'immer';
import _ from 'lodash';
import { Reducer, createContext, Dispatch } from 'react';
import { Calendar, CalendarEvent } from 'types/models/Calendar';

export type CalendarState = Calendar & {
  from: number;
  to: number;
};

export enum CalendarActions {
  SET_DATA = 'SET_DATA',
  NAVIGATE = 'NAVIGATE',
  UPDATE_DATA = 'UPDATE_DATA',
  DELETE_EVENT = 'DELETE_EVENT',
  UPDATE_EVENT_STATUS = 'UPDATE_EVENT_STATUS',
  RESET = 'RESET',
}

type CalendarAction = {
  type: CalendarActions;
  payload?: any;
};

const getMonthRange = (date?: dayjs.ConfigType) => ({
  from: dayjs(date).startOf('month').startOf('week').toDate().getTime(),
  to: dayjs(date).endOf('month').endOf('week').toDate().getTime(),
});

const eventComparator = (
  thisEvent: CalendarEvent,
  thatEvent: CalendarEvent,
) => {
  if (!thisEvent.metadata || !thatEvent.metadata) {
    return _.isEqual(thisEvent, thatEvent);
  }

  return (
    thisEvent.metadata.id === thatEvent.metadata.id &&
    thisEvent.metadata.type === thatEvent.metadata.type
  );
};

export const initialState: CalendarState = {
  slots: [],
  events: [],
  ...getMonthRange(),
};

const reducer: Reducer<CalendarState, CalendarAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CalendarActions.SET_DATA:
      return produce(state, (draftState) => {
        draftState.events = action.payload.events;
        draftState.slots = action.payload.slots;
      });
    case CalendarActions.NAVIGATE:
      return produce(state, (draftState) => {
        const monthRange = getMonthRange(action.payload);
        draftState.from = monthRange.from;
        draftState.to = monthRange.to;
      });
    case CalendarActions.UPDATE_DATA:
      return produce(state, (draftState) => {
        if (!action.payload) {
          return;
        }
        const { events, slots } = action.payload as Calendar;

        draftState.events = _.unionWith(
          events || [],
          draftState.events,
          eventComparator,
        );

        draftState.slots = _.unionBy(slots || [], draftState.slots, 'date');
      });
    case CalendarActions.DELETE_EVENT:
      return produce(state, (draftState) => {
        draftState.events = draftState.events.filter(
          (event) => !eventComparator(event, action.payload),
        );
      });
    case CalendarActions.UPDATE_EVENT_STATUS:
      return produce(state, (draftState) => {
        const event = draftState.events.find((e) =>
          eventComparator(e, action.payload),
        );
        if (!event) {
          return;
        }

        event.metadata = {
          ...event.metadata,
          status: action.payload.metadata.status,
        };
      });
    case CalendarActions.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;

export const CalendarContext = createContext<
  CalendarState & { dispatch: Dispatch<CalendarAction>; refetch: () => void }
>({
  ...initialState,
  dispatch: () => {},
  refetch: () => {},
});

export const updateEvent = (event: CalendarEvent) => ({
  type: CalendarActions.UPDATE_DATA,
  payload: { events: [event] },
});

export const deleteEvent = (event: { id: number; type: EventModelType }) => ({
  type: CalendarActions.DELETE_EVENT,
  payload: { metadata: event },
});

export const updateEventStatus = (event: {
  id: number;
  type: EventModelType;
  status: number;
}) => ({
  type: CalendarActions.UPDATE_EVENT_STATUS,
  payload: { metadata: event },
});
