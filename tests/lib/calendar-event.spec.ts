import { getDateRange } from 'lib/helpers/date';
import {
  isReservationEventDate,
  splitDatesByReservation,
} from 'lib/transformers/calendar-event';
import { Calendar } from 'tests/fixtures/calendar-events';

describe('isReservationEventDate', () => {
  const event = {
    title: 'Luisa Huels',
    start: new Date('2022-02-06T09:05:43.000000Z'),
    end: new Date('2022-02-12T09:05:43.000000Z'),
    allDay: false,
    resource_id: 2219,
    metadata: {
      id: 796,
      type: 'Reservation',
      resource_id: 2219,
      resource_type: 'Property',
      roomsIds: [11724, 11725, 11726, 11727, 11728],
      userName: 'Luisa Huels',
      userAvatar:
        'http://localhost/storage/testing/user/3113/p9KxjBswIXHhzwGUGATTESDCeNUHWJXiodRVRi0P.png',
      status: 2,
    },
  };
  it('should return true when given date is reservation date', () => {
    expect(
      isReservationEventDate(
        event.metadata.roomsIds[0],
        new Date('2022-02-06'),
        event,
      ),
    ).toBe(true);
  });

  it('should return false when given date is not a reservation date', () => {
    expect(
      isReservationEventDate(
        event.metadata.roomsIds[0],
        new Date('2022-02-05'),
        event,
      ),
    ).toBe(false);
  });
});

describe('splitDatesByReservation', () => {
  const dates = getDateRange(new Date('2022-02-01'), new Date('2022-03-31'));
  it('should return work when events is an empty array', () => {
    expect(splitDatesByReservation(1, dates, [])[0].dates.length).toBe(
      dates.length,
    );
  });
  it('should split given dates by events', () => {
    expect(
      splitDatesByReservation(11725, dates, Calendar.events),
    ).toMatchSnapshot();
  });
});
