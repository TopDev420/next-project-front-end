import React from 'react';
import Link from 'next/link';
import { Location } from 'types/models/Location';
import { getSearchRoute } from 'lib/helpers/route';
import { convertCountryCodeToFullName } from 'lib/transformers/location';

type LocationTagsProps = Pick<Location, 'city' | 'state' | 'countryCode'>;

const renderTag = (keyword: string, displayText: string) => (
  <Link href={getSearchRoute({ formattedAddress: keyword })}>
    <a className="px-4 py-1 rounded-xl shadow-md bg-blue-900 text-xs text-white mr-2 whitespace-nowrap">
      {displayText}
    </a>
  </Link>
);

const LocationTags: React.FC<LocationTagsProps> = ({
  city,
  state,
  countryCode,
}) => {
  if (!city && !state && !countryCode) {
    return null;
  }

  return (
    <div className="py-2 overflow-x-auto flex flex-row">
      {!!city && renderTag(city, city)}
      {!!state && renderTag(state, state)}
      {!!countryCode &&
        renderTag(
          convertCountryCodeToFullName(countryCode),
          convertCountryCodeToFullName(countryCode),
        )}
    </div>
  );
};

export default LocationTags;
