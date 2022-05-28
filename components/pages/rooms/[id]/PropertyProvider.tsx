import React, { createContext } from 'react';
import { PropertyDetailResource } from 'types/resources/Property';

export const PropertyContext = createContext<
  PropertyDetailResource | undefined
>(undefined);

export const PropertyProvider: React.FC<{
  property: PropertyDetailResource;
}> = ({ property, children }) => (
  <PropertyContext.Provider value={property}>
    {children}
  </PropertyContext.Provider>
);
