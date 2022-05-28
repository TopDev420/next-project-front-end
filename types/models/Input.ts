export type Input<T = any> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: number;
};
