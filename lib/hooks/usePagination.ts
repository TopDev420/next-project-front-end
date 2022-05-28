import { useState, useCallback, useMemo } from 'react';
import { Pagination, PaginationInput } from 'types/Pagination';
import _ from 'lodash';
import { mergePagination } from 'lib/helpers/pagination';

type UsePaginationArgs<Input, Data> = {
  api: (input: PaginationInput<Input>) => Promise<Pagination<Data>>;
  input?: Input;
  initialData?: Data[];
  initialPagination?: Pagination<Data>;
  preserveLastData?: boolean;
};

const DEFAULT_PAGE_SIZE = 15;

const usePagination = <Input, Data extends { id: number }>({
  api,
  input,
  initialData,
  preserveLastData = false,
  initialPagination: propsInitialPagination,
}: UsePaginationArgs<Input, Data>) => {
  const initialPagination: Pagination<Data> | null = useMemo(() => {
    if (propsInitialPagination) {
      return propsInitialPagination;
    }
    if (!initialData) {
      return null;
    }

    return {
      data: initialData,
      currentPage: 1,
      perPage: DEFAULT_PAGE_SIZE,
      from: 1,
      to:
        initialData.length > DEFAULT_PAGE_SIZE
          ? DEFAULT_PAGE_SIZE
          : initialData.length,
      total: initialData.length,
      lastPage: (initialData.length - 1) / DEFAULT_PAGE_SIZE + 1,
      nextPageUrl: null,
      lastPageUrl: null,
    };
  }, [initialData, propsInitialPagination]);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination<Data> | null>(
    initialPagination,
  );
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      api({ ...input, page })
        .then((result) => {
          setPagination((oldPage) => {
            if (oldPage && preserveLastData) {
              return mergePagination(oldPage, result);
            }

            return result;
          });
          setLoading(false);
        })
        .catch((e: any) => {
          setError(e);
          setLoading(false);
        });
    },
    [api, input, preserveLastData],
  );

  const reset = useCallback(() => {
    setLoading(false);
    setPagination(null);
    setError(null);
  }, []);

  const refetch = useCallback(() => {
    reset();
    fetch();
  }, [reset, fetch]);

  return { loading, pagination, error, fetch, reset, refetch, setPagination };
};

export default usePagination;
