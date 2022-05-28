import Skeleton from 'components/Skeleton';

const BlogSkeleton = () => (
  <div className="blogItem">
    <div className="blogItem__thumbnail">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="blogItem__content">
      <Skeleton className="w-full mb-4" />
      <Skeleton className="mb-2" style={{ width: '50%' }} />
      <Skeleton className="" style={{ width: '50%' }} />
    </div>
  </div>
);

export default BlogSkeleton;
