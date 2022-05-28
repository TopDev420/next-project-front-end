import { get } from 'lib/helpers/api';
import { PropertySearchResource } from 'types/resources/Property';

export const getDestinations = () => get('destinations');
export const getDestinationProperties = (
  location: string,
): Promise<PropertySearchResource[]> =>
  get(`destinations/${location}/properties`);
