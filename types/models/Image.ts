import { Model } from 'types/models/Model';

export type Image = {
  url: string;
  metadata: { sortNo: number } & Record<string, any>;
} & Model;
