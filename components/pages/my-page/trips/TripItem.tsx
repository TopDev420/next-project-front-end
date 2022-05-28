import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { MyPageTripResource } from 'types/resources/Reservation';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';
import { formatNumber, formatPrice } from 'lib/helpers/number';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import HostDetail from 'components/pages/my-page/trips/HostDetail';
import LabelWithIcon from 'components/pages/my-page/LabelWithIcon';
import ReservationStatus from 'components/pages/my-page/ReservationStatus';
import * as reservationTransformer from 'lib/transformers/reservation';
import CheckInIcon from 'assets/images/icons/check-in.svg';
import CheckOutIcon from 'assets/images/icons/check-out.svg';
import PeopleIcon from 'assets/images/icons/people-outline.svg';

type TripItemProps = {
  data: MyPageTripResource;
  onCancel?: () => void;
  loading?: boolean;
};

const TripItem: React.FC<TripItemProps> = ({ data, onCancel, loading }) => (
  <div className="flex flex-row py-4 border-b">
    <div className="relative w-32 h-24 mr-6">
      <Image
        layout="responsive"
        width={4}
        height={3}
        src={data.property?.image?.url || ImagePlaceholder.src}
        alt={data.property?.title}
      />
    </div>
    <div className="flex flex-1 flex-row mr-4">
      <div className="flex flex-col flex-1 mr-2">
        <Link
          href={getPublicPropertyShowRoute(
            data?.propertyId!,
            data?.property?.slug,
          )}
          passHref
        >
          <a className="hover:underline">{data.property?.title}</a>
        </Link>
        <HostDetail data={data.host} />
      </div>
      <div className="flex flex-col text-sm">
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
    </div>

    <div className="flex flex-col flex-initial w-36 text-sm">
      <ReservationStatus status={data.status} />
      {reservationTransformer.canGuestCancelOrDelete(data.status) && (
        <button
          disabled={loading}
          type="button"
          className="btn btn-dark"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </div>
  </div>
);

export default TripItem;
