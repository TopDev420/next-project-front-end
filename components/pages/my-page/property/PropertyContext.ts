import { createContext } from 'react';
import { Property } from 'types/models/Property';

const PropertyContext = createContext<Property | null>(null);

export default PropertyContext;
