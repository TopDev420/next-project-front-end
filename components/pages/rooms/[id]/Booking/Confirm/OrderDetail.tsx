import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { GuestReservationInput } from 'lib/forms/reservation';
import { getTotalNights } from 'lib/transformers/reservation';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';

type OrderDetailProps = {
  input?: GuestReservationInput;
};

const OrderDetail: React.FC<OrderDetailProps> = ({ input }) => {
  const property = useContext(PropertyContext);

  return (
    <div className="orderDetail">
      <div className="orderDetail--row">
        <div className="orderDetail--group">
          <label
            htmlFor="inputOrderDetailCheckIn"
            className="orderDetail--label"
          >
            Check In
          </label>
          <div id="inputOrderDetailCheckIn" className="orderDetail--input">
            {dayjs(input?.checkedInAt).format('MM/DD/YYYY')}
          </div>
        </div>
        <div className="orderDetail--group">
          <label
            htmlFor="inputOrderDetailCheckOut"
            className="orderDetail--label"
          >
            Check Out
          </label>
          <div id="inputOrderDetailCheckOut" className="orderDetail--input">
            {dayjs(input?.checkedOutAt).format('MM/DD/YYYY')}
          </div>
        </div>
      </div>
      <div className="orderDetail--row">
        <div className="orderDetail--group">
          <label
            htmlFor="inputOrderDetailTotalNights"
            className="orderDetail--label"
          >
            Total Nights
          </label>
          <div id="inputOrderDetailTotalNights" className="orderDetail--input">
            {getTotalNights(input?.checkedInAt, input?.checkedOutAt)}
          </div>
        </div>
        <div className="orderDetail--group">
          <label
            htmlFor="inputOrderDetailGuests"
            className="orderDetail--label"
          >
            Guests
          </label>
          <div id="inputOrderDetailGuests" className="orderDetail--input">
            {input?.guests}
          </div>
        </div>
        {property?.roomsCount > 1 && (
          <div className="orderDetail--group">
            <label
              htmlFor="inputOrderDetailRoomsRequested"
              className="orderDetail--label"
            >
              Rooms
            </label>
            <div
              id="inputOrderDetailRoomsRequested"
              className="orderDetail--input"
            >
              {input?.roomsRequested}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderDetail;
