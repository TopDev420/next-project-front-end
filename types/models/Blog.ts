import { HasSeoMeta } from 'types/models/HasSeoMeta';
import { Model } from 'types/models/Model';

export type Blog = {
  title: string;
  slug: string;
  description: string;
  keywords: string;
  content: string;
  publishedAt: string;
  status: number;
  imagePath: string;
  tagsTexts: string[];
} & HasSeoMeta &
  Model;
