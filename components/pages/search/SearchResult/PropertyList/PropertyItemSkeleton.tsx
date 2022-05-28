import Skeleton from 'components/Skeleton';

const PropertyItemSkeleton = () => (
  <div className="propertyItem">
    <div className="propertyItem__slide p-4">
      <Skeleton className="h-full" />
    </div>
    <div className="propertyItem__content p-4">
      <Skeleton className="mb-4" />
      <Skeleton className="mb-4" />
    </div>
  </div>
);

export default PropertyItemSkeleton;
