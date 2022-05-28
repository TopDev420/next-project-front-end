import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { HomePageSearchInput, HomePageSearchQuery } from 'lib/forms/search';
import { Pagination, PaginationInput } from 'types/Pagination';
import { PropertySearchResource } from 'types/resources/Property';
import SearchBar from 'components/pages/search/SearchBar';
import SearchResult from 'components/pages/search/SearchResult';
import { searchProperty } from 'lib/apis/property';
import {
  convertQueryToSearchInput,
  convertSearchInputToQuery,
  diffSearchInputs,
} from 'lib/transformers/search';
import usePagination from 'lib/hooks/usePagination';
import { suppress } from 'lib/helpers/support';
import { BoundingBox, LatLng } from 'types/models/Location';
import useDebounce from 'lib/hooks/useDebounce';
import { boundsEqualCanonically } from 'lib/google/maps';
import { getQueryStringParams } from 'lib/helpers/url';
import { reset } from 'lib/store';
import PageHead from 'components/Layouts/PageHead';

type SearchProps = {
  pagination?: Pagination<PropertySearchResource>;
  filter?: PaginationInput<HomePageSearchQuery>;
};

const Search: React.FC<SearchProps> = ({
  pagination: propsPagination,
  filter: { page: propsPage, ...propsQuery },
}) => {
  const router = useRouter();
  const [filter, setFilter] = useState<HomePageSearchInput>(
    convertQueryToSearchInput(propsQuery),
  );
  const filterRef = useRef(convertQueryToSearchInput(propsQuery));
  const debouncedFilter = useDebounce(filter, 200);

  const query = useMemo(() => convertSearchInputToQuery(filter), [filter]);
  const searchQuery = query.address || '';

  const [page, setPage] = useState(propsPage || 1);
  const [manualBoudingBox, setManualBoundingBox] = useState<BoundingBox>();

  const { loading, pagination, fetch, refetch } = usePagination({
    api: searchProperty,
    input: query,
    initialPagination: propsPagination,
    preserveLastData: true,
  });

  const handleSearchBarChange = useCallback(
    (next: Partial<HomePageSearchInput>) => {
      // map fit bounds when location is changed in search box
      if (
        next.boundingBox &&
        !boundsEqualCanonically(filter.boundingBox, next.boundingBox)
      ) {
        setManualBoundingBox(next.boundingBox);
      }
      setFilter((prev) => ({ ...prev, ...next }));
    },
    [filter.boundingBox],
  );

  const handleLoadMore = useCallback(() => fetch(page + 1), [fetch, page]);

  const handleMapBoundsChanged = useCallback(
    (boundingBox: [LatLng, LatLng]) => {
      setFilter((prev) => ({ ...prev, boundingBox }));
      fetch();
    },
    [fetch],
  );

  /**
   * update current page on pagination update
   */
  useEffect(() => {
    if (pagination?.currentPage) {
      setPage(pagination?.currentPage);
    }
  }, [pagination]);

  /**
   * onDebouncedFilterChange
   */
  useEffect(() => {
    const diff = diffSearchInputs(filterRef.current, debouncedFilter);
    // fetch more data if only bounding box was changed
    if (diff.length === 1 && diff.includes('boundingBox')) {
      fetch();
      // refetch when other fields were changed
    } else if (diff.length > 0) {
      refetch();
    }
    filterRef.current = debouncedFilter;
  }, [fetch, debouncedFilter, refetch]);

  /**
   * update filter on route change
   */
  useEffect(() => {
    const handleRouteChange = () => {
      const locationQuery = getQueryStringParams(window.location.search);
      setFilter(convertQueryToSearchInput(locationQuery));
      reset();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="searchPage">
      <PageHead
        title={
          searchQuery && pagination?.data?.length > 0
            ? `Vacation rentals in ${searchQuery}`
            : 'Search | Vacation.Rentals'
        }
      />
      <SearchBar
        filter={filter}
        onChange={handleSearchBarChange}
        onSearch={refetch}
      />
      <SearchResult
        loading={loading}
        pagination={pagination}
        onLoadMore={handleLoadMore}
        onMapBoundsChanged={handleMapBoundsChanged}
        initialProperties={propsPagination?.data}
        boundingBox={manualBoudingBox}
      />
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const filter = suppress(
    () => convertSearchInputToQuery(convertQueryToSearchInput(query)),
    {},
  );
  try {
    const pagination = await searchProperty(query, req);

    return {
      props: {
        pagination,
        filter,
      },
    };
  } catch (e) {
    return {
      props: {
        filter,
      },
    };
  }
};
