import { useCallback, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useMutation } from 'react-query';
import * as reservationApi from 'lib/apis/reservation';
import usePagination from 'lib/hooks/usePagination';
import ListingSkeleton from 'components/pages/my-page/ListingSkeleton';
import TripItem from 'components/pages/my-page/trips/TripItem';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import Alert from 'components/Alert';
import { formatError } from 'lib/transformers/error';
import { MyPageTripResource } from 'types/resources/Reservation';

const Trips = () => {
  const [page, setPage] = useState(1);
  const { pagination, fetch, loading, refetch } = usePagination({
    api: reservationApi.getMyPageTrips,
    preserveLastData: true,
  });

  const confirm = useContext(ConfirmContext);

  const {
    mutate: cancelReservation,
    isLoading: isLoadingCancel,
    reset: resetCancel,
    data: cancelled,
    error: cancelError,
  } = useMutation<any, any, { id: number; status: number }>(
    reservationApi.cancelOrDeleteReservation as any,
  );

  const handleCancel = useCallback(
    (item: MyPageTripResource) => {
      confirm({
        title: 'Are you sure to cancel this reservation?',
        callback: () => cancelReservation({ id: item.id, status: item.status }),
      });
    },
    [cancelReservation, confirm],
  );

  useEffect(() => {
    fetch(page);
  }, [fetch, page]);

  useEffect(() => {
    if (cancelled) {
      refetch();
    }
  }, [cancelled, refetch]);

  useEffect(
    () => () => {
      resetCancel();
    },
    [resetCancel],
  );

  return (
    <div className="shadow-lg bg-white border max-w-screen-lg mx-auto">
      <div className="p-4 overflow-x-auto">
        {!!cancelError && (
          <Alert
            title="There was an error"
            message={formatError(cancelError)}
          />
        )}
        {!pagination ? (
          <>
            {_.range(5).map((_val, key) => (
              <ListingSkeleton key={String(key)} />
            ))}
          </>
        ) : (
          <>
            {pagination.data.length > 0 ? (
              <div className="min-w-screen-md">
                {pagination.data.map((item) => (
                  <TripItem
                    data={item}
                    loading={isLoadingCancel}
                    onCancel={() => handleCancel(item)}
                  />
                ))}
                {!!pagination.nextPageUrl && (
                  <div className="mt-4 text-center">
                    <button
                      disabled={loading}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setPage((old) => old + 1)}
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">No data to display</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Trips;
