import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import PropertyItem from 'components/pages/search/SearchResult/PropertyList/PropertyItem';
import PropertyItemSkeleton from 'components/pages/search/SearchResult/PropertyList/PropertyItemSkeleton';
import LoadMore from 'components/pages/search/SearchResult/PropertyList/LoadMore';
import { range } from 'lib/helpers/array';
import { SearchResultProps } from 'components/pages/search/SearchResult/types';

type PropertyListProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<
    SearchResultProps,
    'loading' | 'pagination' | 'onLoadMore' | 'onHoverItem'
  >;

const PropertyList: React.FC<PropertyListProps> = ({
  className = '',
  loading,
  pagination,
  onLoadMore,
  onHoverItem = () => {},
  ...props
}) => (
  <div className={`propertyList ${className}`} {...props}>
    {loading && !pagination ? (
      <div className="propertyList__body">
        {range(5).map((_val, key) => (
          <PropertyItemSkeleton key={String(key)} />
        ))}
      </div>
    ) : (
      <>
        {!!pagination && (
          <div className="propertyList__body">
            {pagination.data?.map((item) => (
              <PropertyItem
                data={item}
                key={item.id}
                onMouseEnter={() => onHoverItem(item)}
                onMouseLeave={() => onHoverItem(undefined)}
              />
            ))}
          </div>
        )}
        <div className="propertyList__footer">
          {!pagination?.data?.length && !loading && (
            <div className="p-10">
              <p className="text-center text-gray-400">No results</p>
            </div>
          )}
          {loading && (
            <div className="p-10 text-center">
              <LoadingIndicator />
            </div>
          )}
          {!!pagination?.nextPageUrl && !loading && (
            <LoadMore disabled={loading} onClick={onLoadMore} />
          )}
        </div>
      </>
    )}
  </div>
);

export default PropertyList;
