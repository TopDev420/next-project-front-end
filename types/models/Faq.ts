import { Model } from 'types/models/Model';

export type Faq = {
  title: string;
  slug: string;
  description: string;
  status: number;
  categoryId?: number | null;
  categoryName: string | null;
  updatedAt: string | null;
} & Model;

export type FaqCategory = {
  parentId: number;
  name: string;
  children: FaqCategory[];
} & Model;
