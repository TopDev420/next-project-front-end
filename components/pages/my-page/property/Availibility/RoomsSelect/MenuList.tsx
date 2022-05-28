import React, { memo } from 'react';
import { components } from 'react-select';

const { MenuList } = components;

type RoomSelectMenuListProps = {
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  clearAllText?: string;
} & Record<string, any>;

const RoomSelectMenuList: React.FC<RoomSelectMenuListProps> = ({
  loading = false,
  hasMore = false,
  onLoadMore = () => {},
  showClearAll = false,
  clearAllText = 'Clear all',
  onClearAll = () => {},
  ...props
}) => (
  <MenuList {...(props as any)}>
    {showClearAll && (
      <div className="text-center py-1 border-b">
        <button
          type="button"
          className="text-blue-700 hover:underline text-sm"
          onClick={onClearAll}
        >
          {clearAllText}
        </button>
      </div>
    )}
    {props.children}
    {loading ? (
      <>
        <span className="mx-auto text-sm py-1 border-t">Loading...</span>
      </>
    ) : (
      <>
        {hasMore && (
          <div className="text-center py-1 border-t">
            <button
              className="text-blue-700 hover:underline text-sm"
              type="button"
              onClick={onLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </>
    )}
  </MenuList>
);

export default memo(RoomSelectMenuList);
