import { LocationSelectValue } from 'types/models/Location';
import { GoogleAddressParser } from 'lib/google/maps/GoogleAddressParser';

const convertGeocoderResultToAddress = (
  result: google.maps.GeocoderResult,
  location: { lat: number; lng: number },
): LocationSelectValue => {
  const parsed = new GoogleAddressParser(result.address_components).result();

  return {
    addressLine1: [parsed.street_name, parsed.street_number]
      .filter(Boolean)
      .join(' '),
    addressLine2: '',
    city: parsed.city,
    state: parsed.state,
    postalCode: parsed.postal_code,
    countryCode: parsed.country_code,
    formattedAddress: result.formatted_address,
    ...location,
  };
};

export default convertGeocoderResultToAddress;
