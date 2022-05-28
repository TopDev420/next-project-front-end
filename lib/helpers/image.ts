import { Image } from 'types/models/Image';
import _ from 'lodash';

export const getDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsDataURL(file);
  });

export const sortImages = (images: Image[]) => {
  if (!images) {
    return [];
  }
  return _.sortBy(images, (item) => item.metadata?.sortNo);
};
