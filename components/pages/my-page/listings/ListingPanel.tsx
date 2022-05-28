import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useMutation } from 'react-query';
import * as propertyApi from 'lib/apis/property';
import usePagination from 'lib/hooks/usePagination';
import { classNames } from 'lib/helpers/ui';
import { formatError } from 'lib/transformers/error';
import ListingSkeleton from 'components/pages/my-page/ListingSkeleton';
import ListingItem from 'components/pages/my-page/listings/ListingItem';
import Alert from 'components/Alert';

type ListingPanelProps = {
  title: string;
  status: number;
  className?: string;
};

const ListingPanel: React.FC<ListingPanelProps> = ({
  title,
  status,
  className,
}) => {
  const [page, setPage] = useState(1);
  const query = useMemo(() => ({ status }), [status]);
  const { pagination, fetch, loading, setPagination } = usePagination({
    api: propertyApi.getMyPageListing,
    input: query,
    preserveLastData: true,
  });

  const {
    error,
    isLoading: updatingStatus,
    data: updatedStatus,
    mutate: updateStatus,
  } = useMutation(propertyApi.updateStatus);

  useEffect(() => {
    fetch(page);
  }, [fetch, page]);

  useEffect(() => {
    if (!updatedStatus) {
      return;
    }
    setPagination((oldPage) => {
      if (!oldPage?.data) {
        return oldPage;
      }
      const items = oldPage.data;
      const oldItemIdx = oldPage.data.findIndex(
        (item) => item.id === updatedStatus.propertyId,
      );
      if (oldItemIdx === -1) {
        return oldPage;
      }
      const oldItem = items[oldItemIdx];
      const newData = [...items];
      newData[oldItemIdx] = { ...oldItem, status: updatedStatus.status };
      return { ...oldPage, data: newData };
    });
  }, [updatedStatus, setPagination]);

  return (
    <div className={classNames('shadow-lg bg-white', className)}>
      <div className="bg-blue-800 p-4 text-white">
        <h3>{title}</h3>
      </div>
      {!!error && <Alert severity="danger" title={formatError(error)} />}
      <div className="p-4 overflow-x-auto">
        {!pagination ? (
          <>
            {_.range(5).map((_val, key) => (
              <ListingSkeleton key={String(key)} />
            ))}
          </>
        ) : (
          <>
            {pagination.data.length > 0 ? (
              <div style={{ minWidth: 768 }}>
                {pagination.data.map((item) => (
                  <ListingItem
                    disabled={updatingStatus}
                    data={item}
                    key={item.id}
                    onStatusChange={(value) =>
                      updateStatus({ propertyId: item.id, status: value })
                    }
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

export default ListingPanel;
