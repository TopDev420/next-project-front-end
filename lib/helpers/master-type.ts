import AmenityEntries from 'static/amenity.json';

export const getAmenitiesByCategoryId = (categoryId: number) =>
  AmenityEntries.filter(
    ({ amenityCategoryId }) => amenityCategoryId === categoryId,
  );
