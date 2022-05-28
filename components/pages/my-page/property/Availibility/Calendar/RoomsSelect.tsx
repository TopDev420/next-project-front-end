import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import {
  getMyPagePropertyCalendarRoomRoute,
  getMyPagePropertyStepRoute,
} from 'lib/helpers/route';
import { updateRoom } from 'lib/store/slices/my-page/room';
import RoomSelectComponent from 'components/pages/my-page/property/Availibility/RoomsSelect';
import { Room } from 'types/models/Room';
import { myPagePropertyRoomIdSelector } from 'lib/store/selectors/my-page/room';

type RoomsSelectProps = {
  onChange?: () => void;
};

const RoomsSelect: React.FC<RoomsSelectProps> = ({ onChange }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const propertyId = useSelector(myPagePropertyIdSelector);
  const roomId = useSelector(myPagePropertyRoomIdSelector);

  const handleChange = useCallback(
    (
      selectedOption?: { label: string; value: number } | null,
      rooms?: Room[],
    ) => {
      if (selectedOption?.value && propertyId) {
        const newRoom = rooms?.find((item) => item.id === selectedOption.value);
        if (!newRoom) {
          return;
        }
        dispatch(updateRoom(newRoom));
        router.push(
          getMyPagePropertyCalendarRoomRoute(propertyId, selectedOption?.value),
        );
      } else {
        dispatch(updateRoom(null));
        router.push(getMyPagePropertyStepRoute(propertyId!, 'calendar'));
      }

      if (onChange) {
        onChange();
      }
    },
    [dispatch, propertyId, router, onChange],
  );

  return (
    <RoomSelectComponent
      styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
      menuPortalTarget={(() => {
        if (typeof window === undefined) {
          return undefined;
        }
        return window.document.body;
      })()}
      showClearAll={!!roomId}
      clearAllText="Show all events"
      onChange={handleChange}
      onClearAll={() => handleChange(null)}
    />
  );
};

export default RoomsSelect;
