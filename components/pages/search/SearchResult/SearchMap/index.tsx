import React from 'react';
import GoogleMap from 'components/pages/search/SearchResult/SearchMap/GoogleMap';
import { MapProps } from 'components/pages/search/SearchResult/types';

type SearchMapProps = React.HTMLAttributes<HTMLDivElement> & MapProps;

const SearchMap: React.FC<SearchMapProps> = ({
  onMapBoundsChanged,
  properties,
  highlightItemId,
  boundingBox,
  initialProperties,
  ...props
}) => (
  <div {...props}>
    <GoogleMap
      properties={properties}
      onMapBoundsChanged={onMapBoundsChanged}
      highlightItemId={highlightItemId}
      containerStyle={{ height: 600 }}
      boundingBox={boundingBox}
      initialProperties={initialProperties}
    />
  </div>
);

export default SearchMap;
