/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import dayjs from 'dayjs';
import Modal from 'components/Modal';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import { GuestReservationInput } from 'lib/forms/reservation';
import { getTotalNights } from 'lib/transformers/reservation';

type CalculationModalProps = {
  open?: boolean;
  onClose?: () => void;
  input?: GuestReservationInput;
};

const CalculationModal: React.FC<CalculationModalProps> = ({
  open = false,
  onClose = () => {},
  input,
}) => {
  const property = useContext(PropertyContext);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="checkOut">
        <div className="orderDetail">
          <div className="orderDetail--row">
            <div className="orderDetail--group">
              <label className="orderDetail--label">Check In</label>
              <input
                disabled
                className="orderDetail--input"
                value={dayjs(input?.checkedInAt).format('MM/DD/YYYY')}
              />
            </div>
            <div className="orderDetail--group">
              <label className="orderDetail--label">Check Out</label>
              <input
                disabled
                className="orderDetail--input"
                value={dayjs(input?.checkedOutAt).format('MM/DD/YYYY')}
              />
            </div>
          </div>
          <div className="orderDetail--row">
            <div className="orderDetail--group">
              <label className="orderDetail--label">Total Nights</label>
              <input
                disabled
                className="orderDetail--input"
                value={getTotalNights(input?.checkedInAt, input?.checkedOutAt)}
              />
            </div>
            <div className="orderDetail--group">
              <label className="orderDetail--label">Guests</label>
              <input
                disabled
                className="orderDetail--input"
                value={input?.guests}
              />
            </div>
            {property?.roomsCount > 1 && (
              <div className="orderDetail--group">
                <label className="orderDetail--label">Rooms</label>
                <input
                  disabled
                  className="orderDetail--input"
                  value={input?.roomsRequested}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CalculationModal;
