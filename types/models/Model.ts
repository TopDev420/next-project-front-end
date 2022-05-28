export type Model = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ModelData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
