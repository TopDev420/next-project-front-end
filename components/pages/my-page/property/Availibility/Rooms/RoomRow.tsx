import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Room } from 'types/models/Room';
import { convertModelToInput } from 'lib/transformers/room';
import * as roomApi from 'lib/apis/room';
import { RoomInput, RoomSchema } from 'lib/forms/room';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { ConfirmContext } from 'components/Modal/Provider/ConfirmProvider';
import IconButton from 'components/Button/IconButton';
import { useSelector } from 'react-redux';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import { useRouter } from 'next/router';
import { getMyPagePropertyCalendarRoomRoute } from 'lib/helpers/route';

export type RoomRowProps = {
  item?: Room;
  number?: number;
  onUpdated?: () => void;
  onClosed?: () => void;
  editing?: boolean;
};

const RoomRow: React.FC<RoomRowProps> = ({
  item,
  number,
  onUpdated = () => {},
  onClosed,
  editing: initialEditing = false,
}) => {
  const router = useRouter();
  const propertyId = useSelector(myPagePropertyIdSelector);
  const [input, setInput] = useState(convertModelToInput(item, propertyId));

  const [editing, setEditing] = useState(initialEditing);

  const confirm = useContext(ConfirmContext);

  const {
    mutate: saveRoom,
    data: saveData,
    isLoading: saveLoading,
    error: saveError,
    reset: resetSave,
  } = useMutation(roomApi.saveRoom);

  const {
    mutate: deleteRoom,
    isLoading: deleteLoading,
    data: deletedId,
    reset: resetDelete,
  } = useMutation(roomApi.deleteRoom);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RoomInput>({
    defaultValues: input,
    resolver: yupResolver(RoomSchema),
  });

  const isProcessing = saveLoading || deleteLoading;

  const onSubmit: SubmitHandler<RoomInput> = useCallback(
    (param) => {
      saveRoom(param);
    },
    [saveRoom],
  );

  const handleDelete = useCallback(() => {
    if (!item?.id) {
      return;
    }
    confirm({
      title: 'Do you really want to delete the room?',
      callback: () => deleteRoom(item.id),
    });
  }, [confirm, item, deleteRoom]);

  /**
   * onDataChange
   */
  useEffect(() => {
    setInput(convertModelToInput(item));
  }, [item, editing]);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (saveData) {
      onUpdated();
    }
  }, [onUpdated, saveData]);

  useEffect(() => {
    if (deletedId) {
      onUpdated();
    }
  }, [deletedId, onUpdated]);

  /**
   * onEditingChange
   */
  useEffect(() => {
    if (!editing) {
      resetSave();
      resetDelete();
    }
  }, [editing, resetDelete, resetSave]);

  return (
    <tr>
      <td className="w-4 px-4 py-2 whitespace-nowrap text-sm">{number}</td>
      {!!editing ? (
        <ErrorProvider client={errors} server={saveError}>
          <td className="w-12 px-4 py-2 whitespace-nowrap text-sm">
            <div className="flex flex-col justify-start">
              <input className="p-2 border" {...register('title')} />
              <InvalidFeedback name="title" />
            </div>
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-sm flex flex-col">
            <div className="flex flex-col justify-start">
              <input
                className="p-2 border w-full"
                {...register('icalFeedUrl')}
              />
              <InvalidFeedback name="icalFeedUrl" />
            </div>
          </td>
        </ErrorProvider>
      ) : (
        <>
          <td className="px-4 py-2 whitespace-nowrap text-sm">{item?.title}</td>
          <td className="px-4 py-2 whitespace-nowrap text-sm">
            {item?.icalFeedUrl}
          </td>
        </>
      )}

      <td className="w-8 px-4 py-2 whitespace-nowrap text-sm">
        {!editing ? (
          <div className="flex flex-1 justify-end">
            <IconButton
              additionalClass="mr-2 border"
              /*
              // @ts-ignore */
              disabled={isProcessing}
              onClick={() =>
                router.push(
                  getMyPagePropertyCalendarRoomRoute(propertyId!, item?.id!),
                )
              }
              renderIcon={(size, color) => (
                <CalendarIcon
                  width={size}
                  height={size}
                  color={color.indigo[600]}
                />
              )}
            />
            <IconButton
              iconName="edit"
              additionalClass="mr-2"
              /*
              // @ts-ignore */
              disabled={isProcessing}
              onClick={() => setEditing(true)}
            />
            <IconButton
              iconName="delete"
              /*
              // @ts-ignore */
              disabled={isProcessing}
              onClick={handleDelete}
            />
          </div>
        ) : (
          <div className="flex flex-1 justify-end">
            <IconButton
              iconName="check"
              additionalClass="mr-2"
              /*
              // @ts-ignore */
              disabled={isProcessing}
              onClick={handleSubmit(onSubmit)}
            />
            <IconButton
              iconName="close"
              /*
              // @ts-ignore */
              disabled={isProcessing}
              onClick={() => {
                setEditing(false);
                if (onClosed) {
                  onClosed();
                }
              }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default RoomRow;
