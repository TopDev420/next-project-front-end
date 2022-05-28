import { useSelector } from 'react-redux';
import { RkRoom } from 'types/models/Room';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import { RkRoomInput, RkRoomSchema } from 'lib/forms/rkroom';
import { useCallback, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import * as propertyApi from 'lib/apis/property';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorProvider } from 'components/Error/Provider';
import IconButton from 'components/Button/IconButton';
import InvalidFeedback from 'components/Error/InvalidFeedback';

export type RkRoomProps = {
  item?: RkRoom;
  number?: number;
  onUpdated?: () => void;
  onClosed?: () => void;
  editing?: boolean;
};

const RkRoomRow: React.FC<RkRoomProps> = ({
  item,
  number,
  onUpdated = () => {},
  onClosed,
  editing: initialEditing = false,
}) => {
  const propertyId = useSelector(myPagePropertyIdSelector);

  const [input, setInput] = useState<RkRoomInput>({
    roomId: item.roomId,
    rkId: item.rkId,
    propertyId,
  });

  const [editing, setEditing] = useState(initialEditing);

  const {
    mutate: saveRkRoom,
    data: saveData,
    isLoading: saveLoading,
    error: saveError,
    reset: resetSave,
  } = useMutation(propertyApi.saveRkRoom);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RkRoomInput>({
    defaultValues: input,
    resolver: yupResolver(RkRoomSchema),
  });

  const onSubmit: SubmitHandler<RkRoomInput> = useCallback(
    (param) => {
      saveRkRoom(param);
    },
    [saveRkRoom],
  );
  useEffect(() => {
    if (!editing) {
      resetSave();
    }
  }, [editing, resetSave]);

  /**
   * onDataChange
   */
  useEffect(() => {
    setInput({
      roomId: item.roomId,
      rkId: item.rkId,
      propertyId,
    });
  }, [item, editing, propertyId]);

  /**
   * onSaveSuccess
   */
  useEffect(() => {
    if (saveData) {
      onUpdated();
    }
  }, [onUpdated, saveData]);

  /**
   * onEditingChange
   */
  useEffect(() => {
    if (!editing) {
      resetSave();
    }
  }, [editing, resetSave]);

  return (
    <tr>
      <td className="w-4 px-4 py-2 whitespace-nowrap text-sm">{number}</td>
      <td className="px-4 py-2 whitespace-nowrap text-sm">{item?.title}</td>
      {!!editing ? (
        <ErrorProvider client={errors} server={saveError}>
          <td className="px-4 py-2 whitespace-nowrap text-sm">
            <div className="flex flex-col justify-start">
              <input className="p-2 border" {...register('rkId')} />
              <InvalidFeedback name="rkId" />
            </div>
          </td>
        </ErrorProvider>
      ) : (
        <td className="px-4 py-2 whitespace-nowrap text-sm">{item?.rkId}</td>
      )}

      <td className="w-8 px-4 py-2 whitespace-nowrap text-sm">
        {!editing ? (
          <div className="flex flex-1 justify-end">
            <IconButton
              iconName="edit"
              additionalClass="mr-2"
              /*
                            // @ts-ignore */
              disabled={saveLoading}
              onClick={() => setEditing(true)}
            />
          </div>
        ) : (
          <div className="flex flex-1 justify-end">
            <IconButton
              iconName="check"
              additionalClass="mr-2"
              /*
                            // @ts-ignore */
              disabled={saveLoading}
              onClick={handleSubmit(onSubmit)}
            />
            <IconButton
              iconName="close"
              /*
                            // @ts-ignore */
              disabled={saveLoading}
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
export default RkRoomRow;
