/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import _ from 'lodash';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import * as propertyTransformer from 'lib/transformers/property';
import FigureItem from 'components/pages/rooms/[id]/Info/About/Overview/FigureItem';

const Overview = () => {
  const property = useContext(PropertyContext);
  const isMultiple = property?.roomsCount > 1;

  return (
    <div id="about">
      <h2 className="bg-gray-100 p-4">{property?.title}</h2>
      <ul className="flex flex-row border border-t-0 overflow-x-auto items-center">
        <FigureItem
          text={
            propertyTransformer.getPropertyType(property?.propertyTypeId)?.name
          }
        />
        {isMultiple && <FigureItem figure={property?.roomsCount} text="Room" />}
        <FigureItem
          figure={property?.guests}
          text="Guest"
          showMultipleIndicator={isMultiple}
        />
        {property?.bedrooms?.length > 0 && (
          <FigureItem
            figure={property?.bedrooms?.length}
            text="Bedroom"
            showMultipleIndicator={isMultiple}
          />
        )}
        {property?.bathrooms?.length > 0 && (
          <FigureItem
            figure={property?.bathrooms?.length}
            text="Bathroom"
            showMultipleIndicator={isMultiple}
          />
        )}
      </ul>
      {!!property?.propertyDescription?.summary && (
        <div
          className="p-4"
          dangerouslySetInnerHTML={{
            __html: property.propertyDescription.summary,
          }}
        />
      )}
    </div>
  );
};

export default Overview;
