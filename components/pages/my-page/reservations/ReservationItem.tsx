import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import LabelWithIcon from 'components/pages/my-page/LabelWithIcon';
import { getMyPagePropertyStepRoute } from 'lib/helpers/route';
import { formatNumber, formatPrice } from 'lib/helpers/number';
import { RecentReservationResource } from 'types/resources/Reservation';
import GuestDetail from 'components/pages/my-page/reservations/GuestDetail';
import ReservationStatus from 'components/pages/my-page/ReservationStatus';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import CheckInIcon from 'assets/images/icons/check-in.svg';
import CheckOutIcon from 'assets/images/icons/check-out.svg';
import PeopleIcon from 'assets/images/icons/people-outline.svg';

type ReservationItemProps = {
  data: RecentReservationResource;
  onEdit?: () => void;
};

const ReservationItem: React.FC<ReservationItemProps> = ({
  data,
  onEdit = () => {},
}) => (
  <div className="reservation__item">
    <div className="reservation__group">
      <div className="reservation__itemImage">
        <Image
          layout="responsive"
          width={4}
          height={3}
          src={data.property?.image?.url || ImagePlaceholder.src}
          alt={data.property?.title}
        />
      </div>
      <div className="reservation__itemUser">
        <h4 className="hover:underline">
          <Link
            href={getMyPagePropertyStepRoute(data.property.id, 'calendar')}
            passHref
          >
            {data.property?.title}
          </Link>
        </h4>
        {!!data.reservationGuestDetail && (
          <GuestDetail data={data.reservationGuestDetail} />
        )}
      </div>
    </div>

    <div className="reservation__group">
      <div className="reservation__itemDetail">
        <LabelWithIcon
          className="mb-2"
          Icon={CheckInIcon}
          title={dayjs(data?.checkedInAt).format('MM/DD/YYYY')}
        />
        <LabelWithIcon
          className="mb-2"
          Icon={CheckOutIcon}
          title={dayjs(data?.checkedOutAt).format('MM/DD/YYYY')}
        />
        <LabelWithIcon
          className="mb-2"
          Icon={PeopleIcon}
          title={`${formatNumber(data?.guests)} Guest(s)`}
        />
        {!data.reservationDetail || data.reservationDetail.flexible ? (
          <p>Call For Price</p>
        ) : (
          <p>{formatPrice(data.reservationDetail.totalIncTax)}</p>
        )}
      </div>
      <div className="reservation__itemAction">
        <ReservationStatus status={data.status} />
        <button type="button" className="btn btn-primary" onClick={onEdit}>
          Manage
        </button>
      </div>
    </div>
  </div>
);

export default ReservationItem;
