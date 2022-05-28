import { BoundingBox, LatLng } from 'types/models/Location';
import { Pagination } from 'types/Pagination';
import { PropertySearchResource } from 'types/resources/Property';

export type SearchResultProps = {
  loading?: boolean;
  pagination?: Pagination<PropertySearchResource>;
  onLoadMore?: () => void;
  onHoverItem?: (property?: PropertySearchResource) => void;
  onMapBoundsChanged?: (value: [LatLng, LatLng]) => void;
  boundingBox?: BoundingBox;
  initialProperties?: PropertySearchResource[];
};

export type MapProps = Pick<
  SearchResultProps,
  'onMapBoundsChanged' | 'boundingBox' | 'initialProperties'
> & {
  properties?: PropertySearchResource[];
  boundingBox?: BoundingBox;
  highlightItemId?: number;
};
