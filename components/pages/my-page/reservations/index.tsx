import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import * as reservationApi from 'lib/apis/reservation';
import usePagination from 'lib/hooks/usePagination';
import Alert, { AlertProps } from 'components/Alert';
import Modal from 'components/Modal';
import ListingSkeleton from 'components/pages/my-page/ListingSkeleton';
import ReservationItem from 'components/pages/my-page/reservations/ReservationItem';
import EditReservation from 'components/pages/my-page/property/Availibility/EventModal/Reservation';
import { MyPageReservationResource } from 'types/resources/Reservation';

const Reservations = () => {
  const [alert, setAlert] = useState<Omit<AlertProps, 'onChange'>>();
  const [page, setPage] = useState(1);
  const { pagination, fetch, loading, refetch } = usePagination({
    api: reservationApi.getMyPageReservations,
    input: undefined,
    preserveLastData: true,
  });

  const [editReservation, setEditReservation] =
    useState<MyPageReservationResource>();

  const [modalVisible, setModalVisible] = useState(false);

  const onUpdated = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (editReservation) {
      setModalVisible(true);
    }
  }, [editReservation]);

  useEffect(() => {
    fetch(page);
  }, [fetch, page]);

  return (
    <div className="reservation">
      <div className="reservation__content">
        {!!alert && <Alert {...alert} onClose={() => setAlert(undefined)} />}
        <div className="reservation__skeleton">
          {!pagination ? (
            <>
              {_.range(5).map((_val, key) => (
                <ListingSkeleton key={String(key)} />
              ))}
            </>
          ) : (
            <>
              {pagination.data.length > 0 ? (
                <div className="reservation__data">
                  {pagination.data.map((item) => (
                    <ReservationItem
                      key={item.id}
                      data={item}
                      onEdit={() => setEditReservation({ ...item })}
                    />
                  ))}
                  {!!pagination.nextPageUrl && (
                    <div className="reservation__footer">
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
      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        containerClass="sm:max-w-3xl"
      >
        <div>
          <div className="flex flex-row justify-between text-white mb-4 p-4 bg-blue-700">
            <h2>{editReservation?.property?.title || 'Reservation'}</h2>
            <button
              className="text-3xl outline-none"
              type="button"
              onClick={() => setModalVisible(false)}
            >
              &times;
            </button>
          </div>

          <div className="p-4">
            <EditReservation
              value={editReservation}
              onClose={() => setModalVisible(false)}
              onUpdated={onUpdated}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reservations;
