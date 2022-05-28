import usePagination from 'lib/hooks/usePagination';
import {
  myPagePropertyIdSelector,
  myPagePropertySelector,
} from 'lib/store/selectors/my-page/property';
import { useSelector } from 'react-redux';
import * as propertyApi from 'lib/apis/property';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Pagination from 'components/Pagination';
import Skeleton from 'components/Skeleton';
import { useForm, SubmitHandler } from 'react-hook-form';
import _ from 'lodash';
import { ErrorProvider } from 'components/Error/Provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { RkUserInput, RkUserSchema } from 'lib/forms/rkroom';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { useMutation } from 'react-query';
import { isPropertySubscribedPro } from 'lib/helpers/util';
import Alert, { AlertProps } from 'components/Alert';
import RkRoomRow from './RkRoomRow';
import UpdateCalendar from './UpdateCalendar';

const UpdatePanel = () => {
  const property = useSelector(myPagePropertySelector);
  const propertyId = useSelector(myPagePropertyIdSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const isMultipleProperty = !!property && property.roomsCount > 1;

  const fetchInput = useMemo(() => ({ propertyId }), [propertyId]);
  const [adding, setAdding] = useState(false);
  const [initial, setInitial] = useState(true);

  const {
    pagination,
    loading,
    fetch: fetchPagination,
  } = usePagination({
    api: propertyApi.listRkRooms,
    input: fetchInput as any,
  });

  useEffect(() => {
    fetchPagination(currentPage);
  }, [currentPage, fetchPagination]);

  useEffect(() => {
    setAdding(false);
  }, [loading, property]);

  const [rkUserInput] = useState<RkUserInput>({
    userRkId: '',
    roomRkId: null,
    propertyId,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<RkUserInput>({
    defaultValues: rkUserInput,
    resolver: yupResolver(RkUserSchema),
  });
  const {
    mutate: saveRkUser,
    isLoading: saveLoading,
    data: rkUserData,
    error: saveError,
  } = useMutation(propertyApi.saveRkUser);

  const onSubmit: SubmitHandler<RkUserInput> = useCallback(
    (param) => {
      saveRkUser({ ...param, propertyId });
    },
    [propertyId, saveRkUser],
  );

  const fetchRkUser = useCallback(() => {
    propertyApi.getRkUser(propertyId).then((response) => {
      const { userRkId, roomRkId } = response;
      setValue('userRkId', userRkId);
      setValue('roomRkId', roomRkId);
      setValue('propertyId', propertyId);
    });
  }, [propertyId, setValue]);
  useEffect(() => {
    if (initial && propertyId) {
      setInitial(false);
      fetchRkUser();
    }
  }, [fetchRkUser, initial, propertyId]);
  useEffect(() => {
    if (rkUserData) {
      setAlert({
        severity: 'success',
        title: 'Successfully saved',
        onClose: () => setAlert(null),
      });
    }
  }, [rkUserData]);

  if (!isPropertySubscribedPro(property)) {
    return null;
  }
  return (
    <div className="">
      <UpdateCalendar />
      <div className="bg-white flex flex-col shadow-lg border">
        <h3 className="p-6 bg-blue-900 text-white">Config Reservation Keys</h3>
        <div className="p-6">
          {alert && <Alert {...alert} />}
          <ErrorProvider client={errors} server={saveError}>
            <div className="pb-4 mb-4">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 md:pt-4">
                  Reservation Key Account Id
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <input
                  placeholder="Please input 'ID account' of your Reservation Key account"
                  className="p-2 border"
                  {...register('userRkId')}
                />
                <InvalidFeedback name="userRkId" />
              </div>
            </div>
            {!isMultipleProperty && (
              <div className="pb-4 mb-4">
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-1 md:pt-4">
                    Reservation Key Room Id
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <input
                    placeholder="Please input 'ID room' of your Reservation Key account"
                    className="p-2 border"
                    {...register('roomRkId')}
                  />
                  <InvalidFeedback name="roomRkId" />
                </div>
              </div>
            )}
          </ErrorProvider>
          <div className="mb-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
              disabled={saveLoading}
            >
              Save
            </button>
          </div>
          {isMultipleProperty && (
            <>
              <p className="mb-4">Set room's reservation key</p>
              <div className="room-container">
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
                        Reservation Key
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
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {adding && (
                          <RkRoomRow
                            editing
                            onClosed={() => setAdding(false)}
                            onUpdated={() => fetchPagination(currentPage)}
                          />
                        )}
                        {pagination?.data.map((row, index) => (
                          <RkRoomRow
                            item={row}
                            number={
                              index +
                              1 +
                              pagination.perPage * (pagination.currentPage - 1)
                            }
                            onUpdated={() => fetchPagination(currentPage)}
                            key={row.roomId}
                          />
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {!!pagination && (
                <Pagination
                  page={currentPage}
                  totalPage={pagination.lastPage}
                  onChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePanel;
