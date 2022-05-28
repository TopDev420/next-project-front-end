import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import Select from 'react-select';
import usePagination from 'lib/hooks/usePagination';
import * as propertyApi from 'lib/apis/property';
import useDebounce from 'lib/hooks/useDebounce';
import { convertModelToOption } from 'lib/transformers/room';
import MenuList from 'components/pages/my-page/property/Availibility/RoomsSelect/MenuList';
import { Room } from 'types/models/Room';
import _ from 'lodash';

type RoomsSelectProps = {
  onLoadMore?: () => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  clearAllText?: string;
  propertyId: number;
  rooms?: Room[];
  onChangeRoomIds: (ids: number[]) => void;
} & Record<string, any>;

const RoomsSelect: React.FC<RoomsSelectProps> = ({
  showClearAll,
  clearAllText,
  onClearAll,
  propertyId,
  rooms: propRooms = [],
  onChangeRoomIds = () => {},
  ...props
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [rooms, setRooms] = useState(propRooms);

  const fetchInput = useMemo(
    () => ({ propertyId, search: debouncedSearch }),
    [propertyId, debouncedSearch],
  );

  const pageRef = useRef(1);

  const {
    pagination,
    loading,
    fetch: fetchPagination,
    reset: resetPagination,
  } = usePagination({
    api: propertyApi.listRooms,
    input: fetchInput as any,
    preserveLastData: true,
  });

  const toggleRoom = useCallback((room: Room) => {
    setRooms((oldRooms) => _.xorBy(oldRooms, [room], 'id'));
  }, []);

  const handleSelectChange = useCallback(
    ({ value }: { value: number }) => {
      const room = pagination?.data.find((item) => item.id === value);
      if (room) {
        toggleRoom(room);
      }
    },
    [pagination, toggleRoom],
  );

  const renderMenuList = useCallback(
    (passedProps?: any) => (
      <MenuList
        loading={loading}
        hasMore={!!pagination?.nextPageUrl}
        onLoadMore={() => fetchPagination(pageRef.current + 1)}
        showClearAll={showClearAll}
        clearAllText={clearAllText}
        onClearAll={onClearAll}
        {...passedProps}
      />
    ),
    [
      clearAllText,
      fetchPagination,
      loading,
      onClearAll,
      pagination?.nextPageUrl,
      showClearAll,
    ],
  );

  /**
   * update current page ref
   */
  useEffect(() => {
    if (pagination?.currentPage !== undefined) {
      pageRef.current = pagination.currentPage;
    }
  }, [pagination]);

  /**
   * reset pagination when property id is changed
   */
  useEffect(() => {
    if (fetchInput.propertyId) {
      resetPagination();
      pageRef.current = 1;
      fetchPagination(1);
    }
  }, [fetchInput.propertyId, fetchPagination, resetPagination]);

  useEffect(() => {
    onChangeRoomIds(rooms?.map(({ id }) => id));
  }, [rooms, onChangeRoomIds]);

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        {rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className="px-2 py-0.5 bg-gray-200 mr-2 whitespace-nowrap inline-block text-xs"
            onClick={() => toggleRoom(room)}
          >
            {room.title}
            <span className="ml-1">&times;</span>
          </button>
        ))}
      </div>
      <div className="text-sm">
        <Select
          closeMenuOnSelect
          inputValue={search}
          onInputChange={setSearch}
          options={pagination?.data.map(convertModelToOption)}
          styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={(() => {
            if (typeof window === undefined) {
              return undefined;
            }
            return window.document.body;
          })()}
          components={{
            MenuList: renderMenuList,
          }}
          onChange={handleSelectChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default RoomsSelect;
