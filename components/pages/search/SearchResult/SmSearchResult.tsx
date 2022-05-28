import React, { useState } from 'react';
import PropertyList from 'components/pages/search/SearchResult/PropertyList';
import SearchMap from 'components/pages/search/SearchResult/SearchMap';
import ListIcon from 'assets/images/icons/list.svg';
import MapIcon from 'assets/images/icons/map.svg';
import theme from 'constants/theme';
import { SearchResultProps } from 'components/pages/search/SearchResult/types';

const SmSearchResult: React.FC<SearchResultProps> = ({
  onLoadMore,
  pagination,
  loading,
  onMapBoundsChanged,
  boundingBox,
  initialProperties,
}) => {
  const [tab, setTab] = useState<'list' | 'map'>('list');

  return (
    <div className="searchResult searchResult--Sm">
      <div className="searchResult__tabs">
        <button
          type="button"
          className={`searchResult__tab ${
            tab === 'list' ? 'searchResult__tab--active' : ''
          } mr-4`}
          onClick={() => setTab('list')}
        >
          <ListIcon
            className="mr-2"
            width={18}
            height={18}
            fill={theme?.colors?.blue[900]}
          />
          List
        </button>
        <button
          type="button"
          className={`searchResult__tab ${
            tab === 'map' ? 'searchResult__tab--active' : ''
          }`}
          onClick={() => setTab('map')}
        >
          <MapIcon
            className="mr-2"
            width={18}
            height={18}
            fill={theme?.colors?.blue[900]}
          />
          Map
        </button>
      </div>
      <div className="searchResult__content">
        <div style={{ display: tab === 'list' ? 'block' : 'none' }}>
          <PropertyList
            pagination={pagination}
            onLoadMore={onLoadMore}
            loading={loading}
          />
        </div>
        <div style={{ display: tab === 'map' ? 'block' : 'none' }}>
          <SearchMap
            properties={pagination?.data}
            onMapBoundsChanged={onMapBoundsChanged}
            boundingBox={boundingBox}
            initialProperties={initialProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default SmSearchResult;
