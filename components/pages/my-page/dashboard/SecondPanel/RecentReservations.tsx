import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { StatsContext } from 'components/pages/my-page/dashboard/StatsContext';
import StatusBadge from 'components/pages/my-page/dashboard/SecondPanel/StatusBadge';
import theme from 'constants/theme';
import { getFullName } from 'lib/transformers/name';
import { formatPrice } from 'lib/helpers/number';
import { formatDateRange } from 'lib/transformers/reservation';
import { getMyPagePropertyStepRoute } from 'lib/helpers/route';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import AvatarPlaceholder from 'assets/images/icons/person.svg';

const RecentReservations = () => {
  const { recentReservations } = useContext(StatsContext);

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full" style={{ minWidth: 576 }}>
        <thead className="border-b">
          <tr>
            <th>&nbsp;</th>
            <th>Dates and Location</th>
            <th>Guest</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {recentReservations?.length > 0 ? (
            <>
              {recentReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="p-2">
                    <Image
                      src={
                        reservation.property?.image?.url || ImagePlaceholder.src
                      }
                      alt={reservation.property.title}
                      width={48}
                      height={48}
                      layout="fixed"
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      <Link
                        href={getMyPagePropertyStepRoute(
                          reservation.property.id,
                          'calendar',
                        )}
                      >
                        <a className="hover:underline">
                          {reservation.property.title}
                        </a>
                      </Link>
                      <span className="mt-1">
                        {formatDateRange(reservation)}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col items-center text-center">
                      {!!reservation.reservationGuestDetail?.imageUrl ? (
                        <Image
                          width={36}
                          height={36}
                          objectFit="cover"
                          layout="fixed"
                          src={reservation.reservationGuestDetail.imageUrl}
                        />
                      ) : (
                        <AvatarPlaceholder
                          width={36}
                          height={36}
                          fill={theme?.colors?.gray[600]}
                        />
                      )}
                      <a
                        href={`mailto:${
                          reservation.reservationGuestDetail.email || ''
                        }`}
                        className="text-xs mt-1"
                      >
                        {getFullName(reservation.reservationGuestDetail)}
                      </a>
                    </div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="flex flex-col">
                      <span className="whitespace-nowrap">
                        Requested At:{' '}
                        {dayjs(reservation.createdAt).format(
                          'MM/DD/YYYY HH:mm',
                        )}
                      </span>
                      {!!reservation.reservationDetail && (
                        <span className="mt-1">
                          Total:{' '}
                          {formatPrice(
                            reservation.reservationDetail.totalIncTax,
                          )}
                        </span>
                      )}
                      <div className="mt-1">
                        <StatusBadge
                          className="w-auto"
                          status={reservation.status}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 p-2">
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentReservations;
