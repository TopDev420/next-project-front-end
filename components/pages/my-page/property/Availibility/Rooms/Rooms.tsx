import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import * as propertyApi from 'lib/apis/property';
import usePagination from 'lib/hooks/usePagination';
import Pagination from 'components/Pagination';
import Skeleton from 'components/Skeleton';
import RoomRow from 'components/pages/my-page/property/Availibility/Rooms/RoomRow';
import FileUploadButton from 'components/FileUpload/Button';
import { useMutation } from 'react-query';
import Alert from 'components/Alert';

const Rooms = () => {
  const propertyId = useSelector(myPagePropertyIdSelector) as number;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInput = useMemo(() => ({ propertyId }), [propertyId]);

  const [adding, setAdding] = useState(false);

  const {
    pagination,
    loading,
    fetch: fetchPagination,
  } = usePagination({
    api: propertyApi.listRooms,
    input: fetchInput as any,
  });

  const {
    data: csvUploaded,
    isLoading: isUploadingCsv,
    error: csvError,
    reset: resetCsvUpload,
    mutate: uploadCsv,
  } = useMutation(propertyApi.roomsCsv);

  useEffect(() => {
    fetchPagination(currentPage);
  }, [currentPage, fetchPagination]);

  useEffect(() => {
    setAdding(false);
  }, [loading]);

  useEffect(() => {
    if (csvUploaded) {
      if (currentPage === 1) {
        fetchPagination(currentPage);
      } else {
        setCurrentPage(1);
      }
    }
  }, [csvUploaded, currentPage, fetchPagination]);

  useEffect(
    () => () => {
      resetCsvUpload();
    },
    [resetCsvUpload],
  );

  return (
    <div className="bg-white shadow-lg p-6 mb-4">
      <h3 className="mb-4">Rooms</h3>
      <p className="mb-4">Manage similar listings</p>
      <div className="bg-gray-100 text-sm p-2 mb-4">
        We'll try to sync your calendar with ical feed when a iCal feed URL is
        saved for the first time. <br /> We'll notify you via email when the
        first synchronization is done. <br /> After that, iCal feeds are synced
        every six hours.
      </div>
      {!!csvError && (
        <Alert
          severity="danger"
          message={(csvError as any)?.message || 'Csv upload failed'}
        />
      )}
      <div className="flex flex-row justify-end">
        <FileUploadButton
          disabled={isUploadingCsv}
          inputProps={{ accept: '.csv,.txt' }}
          title="CSV"
          onChange={(file) => uploadCsv({ propertyId, file })}
        />
        <button
          disabled={isUploadingCsv}
          type="button"
          className="btn btn-primary ml-2"
          onClick={() => setAdding(true)}
        >
          Add
        </button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ICal Feed URL
            </th>
            <th className="w-8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <>
              {_.range(15).map((idx) => (
                <tr key={String(idx)}>
                  <td className="w-4 px-4 py-2 whitespace-nowrap text-sm">
                    <Skeleton />
                  </td>
                  <td className="w-12 px-4 py-2 whitespace-nowrap text-sm">
                    <Skeleton />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <Skeleton />
                  </td>
                  <td className="w-8 px-4 py-2 whitespace-nowrap text-sm">
                    <Skeleton />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {adding && (
                <RoomRow
                  editing
                  onClosed={() => setAdding(false)}
                  onUpdated={() => fetchPagination(currentPage)}
                />
              )}
              {pagination?.data.map((row, index) => (
                <RoomRow
                  item={row}
                  number={
                    index +
                    1 +
                    pagination.perPage * (pagination.currentPage - 1)
                  }
                  onUpdated={() => fetchPagination(currentPage)}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
      {!!pagination && (
        <Pagination
          page={currentPage}
          totalPage={pagination.lastPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Rooms;
