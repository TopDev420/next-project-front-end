import { Model } from 'types/models/Model';
import { Image } from 'types/models/Image';

export type Destination = {
  title: string;
  slug?: string;
  subtitle: string;
  content: string;
  parentId: number | null;
  children: Destination[];
  keywords?: string;
  description?: string;
  location?: string;
  banner?: Image;
} & Model;
