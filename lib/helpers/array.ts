import _ from 'lodash';

// @ts-ignore
export const range = (number: number) => [...Array(number).keys()];

export const splitAt = <T>(array: T[], index: number) => {
  if (_.toInteger(index) <= 0) {
    return [[], array];
  }

  const firstItems = _.slice(array, 0, index);
  const tail = _.slice(array, index);

  return [firstItems, tail];
};

export const arrayEqualsCanonically = (arr1?: any[], arr2?: any[]) => {
  const truthy1 = !!arr1;
  const truthy2 = !!arr2;
  if (truthy1 !== truthy2) {
    return false;
  }
  const arrayish1 = Array.isArray(arr1);
  const arrayish2 = Array.isArray(arr2);
  if (!arrayish1 && !arrayish2) {
    return arr1 === arr2;
  }
  if (arrayish1 !== arrayish2) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  return _.intersection(arr1, arr2).length === arr1.length;
};
