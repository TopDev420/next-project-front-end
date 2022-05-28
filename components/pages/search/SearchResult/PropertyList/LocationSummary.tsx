/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Link from 'next/link';
import { PropertySearchResource } from 'types/resources/Property';
import { getSearchRoute } from 'lib/helpers/route';

type LocationSummaryProps = {
  location?: PropertySearchResource['location'];
};

const LocationSummary: React.FC<LocationSummaryProps> = ({ location }) => {
  const components = [location?.city, location?.state].filter((item) => !!item);
  return (
    <div className="flex flex-row">
      {components.map((item, index) => (
        <React.Fragment key={String(index)}>
          <Link href={getSearchRoute({ formattedAddress: item })}>
            <a className="hover:underline text-sm">{item}</a>
          </Link>
          {index < components.length - 1 && <span className="mx-1">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LocationSummary;
