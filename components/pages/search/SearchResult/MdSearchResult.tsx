import React, { useState } from 'react';
import PropertyList from 'components/pages/search/SearchResult/PropertyList';
import SearchMap from 'components/pages/search/SearchResult/SearchMap';
import { SearchResultProps } from 'components/pages/search/SearchResult/types';

const MdSearchResult: React.FC<SearchResultProps> = ({
  onLoadMore,
  pagination,
  loading,
  onMapBoundsChanged,
  boundingBox,
  initialProperties,
}) => {
  const [highlightItemId, setHighlightItemId] = useState<number>();

  return (
    <div className="searchResult searchResult--Md">
      <PropertyList
        className="flex-1"
        pagination={pagination}
        onLoadMore={onLoadMore}
        onHoverItem={(item) => setHighlightItemId(item?.id)}
        loading={loading}
      />
      <SearchMap
        properties={pagination?.data}
        highlightItemId={highlightItemId}
        className="flex-1"
        onMapBoundsChanged={onMapBoundsChanged}
        boundingBox={boundingBox}
        initialProperties={initialProperties}
      />
    </div>
  );
};

export default MdSearchResult;
