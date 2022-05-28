import React, { useEffect } from 'react';
import { UseMutationResult } from 'react-query';
import Image from 'next/image';
import Modal from 'components/Modal';
import OrderDetail from 'components/pages/rooms/[id]/Booking/Confirm/OrderDetail';
import { GuestReservationInput } from 'lib/forms/reservation';
import { Reservation, ReservationCalculation } from 'types/models/Reservation';
import Calculation from 'components/pages/rooms/[id]/Booking/Confirm/Calculation';
import UserInfo from 'components/pages/rooms/[id]/Booking/Confirm/UserInfo';
import LoadingIndicator from 'components/LoadingIndicator';
import Alert from 'components/Alert';

type CalculationModalProps = {
  open?: boolean;
  onClose?: () => void;
  onCheckOut?: () => void;
  data?: ReservationCalculation;
  input?: GuestReservationInput;
  mutation: UseMutationResult<
    Reservation,
    unknown,
    GuestReservationInput,
    unknown
  >;
};

const Confirm: React.FC<CalculationModalProps> = ({
  open = false,
  onClose = () => {},
  onCheckOut = () => {},
  data,
  input,
  mutation,
}) => {
  const { data: reservation, isLoading, reset } = mutation;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onCheckOut();
  };

  const renderActions = () => (
    <div className="flex flex-col lg:flex-row-reverse lg:text-right p-6">
      {!!reservation ? (
        <>
          <div className="flex flex-col">
            <div className="p-b-0 text-left">
              <Alert
                severity="success"
                title="Request Sent"
                message="Your reservation request has been sent to the property owner"
              />
            </div>
            <button type="button" className="btn btn-dark" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary mb-2 lg:mb-0"
          >
            {isLoading && <LoadingIndicator left light />}
            Request a Reservation
          </button>
          <button
            type="button"
            className="btn btn-dark lg:mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );

  useEffect(() => () => reset(), [reset]);

  return (
    <Modal
      containerClass="reservationConfirmModal"
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="checkOut">
          <div className="flex flex-col lg:relative lg:text-white">
            <div className="hidden lg:block absolute inset-0">
              <Image
                width={1}
                height={1}
                layout="responsive"
                src="https://res.cloudinary.com/vacation-rentals/image/upload/c_fill,fl_lossy,h_640,q_auto:low,w_auto/v1/images/slider_1538410411.jpg"
              />
            </div>
            <div className="checkOut__overlay" />
            <div className="lg:z-10">
              <OrderDetail input={input} />
              <Calculation calculation={data} />
            </div>
          </div>
          <div className="flex flex-col">
            <UserInfo />
            <div className="block lg:block">{renderActions()}</div>
          </div>
        </div>
        <div className="hidden lg:hidden">{renderActions()}</div>
      </form>
    </Modal>
  );
};

export default Confirm;
