import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { BlogSearchQuery } from 'lib/forms/blog';
import * as blogApi from 'lib/apis/blog';
import { Pagination, PaginationInput } from 'types/Pagination';
import { BlogResource } from 'types/resources/Blog';
import useDebounce from 'lib/hooks/useDebounce';
import usePagination from 'lib/hooks/usePagination';
import theme from 'constants/theme';
import BlogSkeleton from 'components/pages/blogs/Index/BlogSkeleton';
import BlogItem from 'components/pages/blogs/Index/BlogItem';
import LoadingIndicator from 'components/LoadingIndicator';
import SearchIcon from 'assets/images/icons/search.svg';

export type BlogsProps = {
  pagination?: Pagination<BlogResource>;
  filter: PaginationInput<BlogSearchQuery>;
};

const queryToSearch = (query?: any) => String(query?.query || '');

const Blogs: React.FC<BlogsProps> = ({
  pagination: propsPagination,
  filter: { page: propsPage, ...propsQuery },
}) => {
  const [search, setSearch] = useState(queryToSearch(propsQuery));
  const [page, setPage] = useState(propsPage);
  const propsQueryRef = useRef(propsQuery);

  const filter = useMemo(
    () => ({
      page,
      query: search,
    }),
    [page, search],
  );
  const initialRef = useRef(true);

  const debouncedFilter = useDebounce(filter, 300);

  const { loading, pagination, fetch, refetch } = usePagination({
    api: blogApi.searchBlog,
    input: debouncedFilter,
    initialPagination: propsPagination,
    preserveLastData: true,
  });

  /**
   * update current page on pagination update
   */
  useEffect(() => {
    if (pagination?.currentPage) {
      setPage(pagination?.currentPage);
    }
  }, [pagination]);

  /**
   * refetch on query is changed
   */
  useEffect(() => {
    // do not fetch on initial
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    refetch();
  }, [debouncedFilter, refetch]);

  /**
   * update query on props change
   */
  useEffect(() => {
    if (!_.isEqual(propsQueryRef.current, propsQuery)) {
      setSearch(queryToSearch(propsQuery));
    }
    propsQueryRef.current = propsQuery;
  }, [propsQuery]);

  return (
    <div className="blogsPage">
      <div className="blogsPage__wrapper">
        <h1 className="blogsPage__title">VacaRent Blogs</h1>
        <div className="searchBox">
          <input
            className="searchBox__input"
            type="text"
            value={search || ''}
            onChange={(e) => setSearch(e.target.value || '')}
          />
          <SearchIcon
            className="searchBox__icon"
            width={18}
            height={18}
            fill={theme.colors?.gray[400]}
          />
        </div>
        <div className="searchResult">
          {!pagination ? (
            <>
              {_.range(5).map((id) => (
                <BlogSkeleton key={id} />
              ))}
            </>
          ) : (
            <>
              {pagination.data.length > 0 ? (
                <>
                  {pagination.data.map((item) => (
                    <BlogItem data={item} key={item.id} />
                  ))}
                </>
              ) : (
                <p className="noResult">No data to display</p>
              )}
              {!!pagination.nextPageUrl && (
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => fetch(page + 1)}
                  >
                    {loading && <LoadingIndicator left light />}
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
