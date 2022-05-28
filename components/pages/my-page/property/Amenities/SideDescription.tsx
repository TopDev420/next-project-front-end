import React from 'react';
import CATEGORIES from 'static/amenity-category.json';

const AmenitiesSideDescription = () => (
  <>
    <p className="mb-2">Choose amenities features inside your listing:</p>
    <dl>
      {CATEGORIES.map((category) => (
        <React.Fragment key={category.id}>
          <dt className="text-base mb-2 pb-1 mt-4 border-b border-green-400">
            {category.name}
          </dt>
          <dd className="mb-2 leading-5 text-sm">
            {category.name === category.description ? '' : category.description}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  </>
);

export default AmenitiesSideDescription;
