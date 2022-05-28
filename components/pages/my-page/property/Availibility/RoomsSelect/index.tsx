import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { myPagePropertyRoomSelector } from 'lib/store/selectors/my-page/room';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import usePagination from 'lib/hooks/usePagination';
import * as propertyApi from 'lib/apis/property';
import useDebounce from 'lib/hooks/useDebounce';
import { convertModelToOption } from 'lib/transformers/room';
import MenuList from 'components/pages/my-page/property/Availibility/RoomsSelect/MenuList';
import { Room } from 'types/models/Room';

type RoomsSelectProps = {
  onChange?: (
    selectedOption?: { label: string; value: number } | null,
    rooms?: Room[],
  ) => void;
  onLoadMore?: () => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  clearAllText?: string;
} & Record<string, any>;

const RoomsSelect: React.FC<RoomsSelectProps> = ({
  onChange,
  showClearAll,
  clearAllText,
  onClearAll,
  ...props
}) => {
  const room = useSelector(myPagePropertyRoomSelector);
  const propertyId = useSelector(myPagePropertyIdSelector);
  const [search, setSearch] = useState(room?.title || '');
  const debouncedSearch = useDebounce(search, 500);

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
    initialData: room ? [room] : undefined,
    preserveLastData: true,
  });

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

  useEffect(() => {
    if (pagination?.currentPage !== undefined) {
      pageRef.current = pagination.currentPage;
    }
  }, [pagination]);

  useEffect(() => {
    if (fetchInput.propertyId) {
      resetPagination();
      pageRef.current = 1;
      fetchPagination(1);
    }
  }, [fetchInput.propertyId, fetchPagination, resetPagination]);

  return (
    <Select
      closeMenuOnSelect
      inputValue={search}
      onInputChange={setSearch}
      options={pagination?.data.map(convertModelToOption)}
      components={{
        MenuList: renderMenuList,
      }}
      {...props}
      onChange={
        onChange
          ? (val) => {
              if (onChange) {
                onChange(val, pagination?.data);
              }
            }
          : undefined
      }
    />
  );
};

export default RoomsSelect;
