import _ from 'lodash';
import { ReactImageGalleryItem } from 'react-image-gallery';
import { OPTIONAL_STEPS, STEPS } from 'constants/steps';
import { UpdatePropertyImagesInput } from 'lib/forms/image';
import { Property } from 'types/models/Property';
import { StepType } from 'types/ui/Stepper';
import {
  findMasterTypeById,
  SUBSCRIPTION_STATUS_SUBSCRIBED,
} from 'constants/master-types';
import { MasterType } from 'types/models/MasterType';
import Amenities from 'static/amenity.json';
import AmenityCategories from 'static/amenity-category.json';
import PropertyTypes from 'static/property-type.json';
import { sortImages } from 'lib/helpers/image';

export const isStepCompleted = (
  property: Property,
  step: StepType,
): boolean => {
  switch (step) {
    case 'basics':
      return !!(property?.bathrooms?.length || property?.bedrooms?.length);
    case 'description':
      return !!property?.propertyDescription?.title;
    case 'location':
      return !!property?.location;
    case 'amenities':
      return !!property?.amenitiesIds?.length;
    case 'photos':
      return (
        property?.images?.length > 0 &&
        property.images.findIndex((item) => !item?.metadata?.alt) === -1
      );
    case 'video':
      return !!property?.video?.length;
    case 'fees':
      return !!property?.price;
    case 'calendar':
      return !!property?.room?.icalFeedUrl;
    case 'terms':
      return !!property?.propertyTerm;
    case 'reservation-key':
      return true;
    case 'publish':
      return false;
    default:
      return false;
  }
};

export const getIncompleteSteps = (property: Property) =>
  _.difference(STEPS, OPTIONAL_STEPS).filter(
    (step) => step !== 'publish' && !isStepCompleted(property, step),
  );

export const convertToPropertyImagesInput = (
  property: Property | null,
): UpdatePropertyImagesInput => {
  const input: Partial<UpdatePropertyImagesInput> = {};
  input.propertyId = property?.id!;
  if (!property?.images) {
    input.images = [];
    return input as UpdatePropertyImagesInput;
  }

  input.images = [...property.images]
    .sort((a, b) => a.metadata.sortNo - b.metadata.sortNo)
    .map((image) => ({
      id: image.id,
      alt: image.metadata?.alt || '',
      url: image.url,
    }));

  return input as UpdatePropertyImagesInput;
};

export const convertToGalleryImages = (
  property: Property | null,
): ReactImageGalleryItem[] => {
  if (!property?.images) {
    return [
      {
        original:
          'https://res.cloudinary.com/vacation-rentals/image/upload/v1640713520/image-placeholder.png',
        thumbnail:
          'https://res.cloudinary.com/vacation-rentals/image/upload/v1640713520/image-placeholder.png',
      },
    ];
  }

  return sortImages(property.images).map((image) => ({
    original: image.url,
    thumbnail: image.url,
    originalAlt: image.metadata?.alt || '',
    thumbnailAlt: image.metadata?.alt || '',
  }));
};

export const getPropertyType = (propertyTypeId?: number) =>
  findMasterTypeById(PropertyTypes, propertyTypeId);

export const getAmenityCategoryTree = (amenitiesIds?: number[]) => {
  const result: Array<{ category: MasterType; amenities: MasterType[] }> = [];
  if (!amenitiesIds?.length) {
    return [];
  }
  const amenities = amenitiesIds
    .map((id) => findMasterTypeById(Amenities, id))
    .filter((item) => !!item);

  amenities.forEach((item) => {
    const amenityCategory = findMasterTypeById(
      AmenityCategories,
      item.amenityCategoryId,
    );
    if (!amenityCategory) {
      return;
    }

    const existingCategoryIndex = result.findIndex(
      ({ category }) => category.id === amenityCategory.id,
    );
    if (existingCategoryIndex > -1) {
      result[existingCategoryIndex].amenities.push(item);
    } else {
      result.push({
        category: amenityCategory,
        amenities: [item],
      });
    }
  });

  return result;
};

export const getDescriptionTree = (property: Property) => {
  const result: { title: string; html: string }[] = [];

  if (!property?.propertyDescription) {
    return result;
  }

  const { propertyDescription } = property;

  const titleMap = {
    guestAccess: 'Lodging Description',
    guestInteraction: 'Interaction with Guests',
    notes: 'Other Things to Note',
    houseRules: 'House Rules',
    neighborOverview: 'Neighborhood Overview',
    neighborGettingAround: 'Getting Around',
  };

  _.map(titleMap, (title, key) => {
    const html = propertyDescription[key as any];
    if (html) {
      result.push({
        title,
        html,
      });
    }
  });

  return result;
};

export const isSubscribed = (property: Property) =>
  property?.subscription?.status === SUBSCRIPTION_STATUS_SUBSCRIBED;
