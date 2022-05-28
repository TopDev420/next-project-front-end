import Skeleton from 'components/Skeleton';

const ListingSkeleton = () => (
  <div className="flex flex-row py-4 border-b">
    <div className="w-32 h-24 mr-6">
      <Skeleton style={{ width: '100%', height: '100%' }} />
    </div>
    <div className="flex flex-col flex-1 mr-4">
      <Skeleton className="mb-3" />
      <Skeleton className="mb-3" />
      <Skeleton />
    </div>
    <div className="flex flex-col w-16 md:w-32">
      <Skeleton className="mb-3" />
      <Skeleton className="mb-3" />
      <Skeleton />
    </div>
  </div>
);

export default ListingSkeleton;
