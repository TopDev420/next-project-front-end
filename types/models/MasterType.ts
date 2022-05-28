import { Model } from 'types/models/Model';

export type MasterType = {
  name: string;
  description: string;
  sortNo: number;
  status: number;
} & Model;
