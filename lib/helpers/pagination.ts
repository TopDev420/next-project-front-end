import _ from 'lodash';
import { Pagination } from 'types/Pagination';

export const mergePagination = <T extends { id: number }>(
  oldPage: Pagination<T>,
  newPage: Pagination<T>,
): Pagination<T> => {
  const { data: newData } = newPage;
  const { data: oldData } = oldPage;
  const data = _.unionBy(oldData, newData, 'id');
  return {
    ...newPage,
    data,
  };
};
