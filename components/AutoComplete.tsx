import React from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Config from 'config';

const libraries = ['places'] as Array<'places'>;

const AutoComplete: React.FC<React.ComponentProps<typeof Autocomplete>> = ({
  children,
  ...props
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Config.GOOGLE_MAP_API_KEY!,
    libraries,
  });

  return (
    <>
      {isLoaded ? <Autocomplete {...props}>{children}</Autocomplete> : children}
    </>
  );
};

export default AutoComplete;
