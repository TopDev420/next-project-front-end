import React, { useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import MapPinIcon from 'assets/images/icons/map-pin.svg';
import theme from 'constants/theme';
import { HomePageSearchInput } from 'lib/forms/search';

const Input = () => (
  <input
    className="outline-none p-2 flex-1 text-sm w-full"
    type="text"
    placeholder="City, State"
  />
);

const Autocomplete = dynamic(() => import('components/AutoComplete'), {
  loading: Input,
  ssr: false,
});

export type PlaceSearchProps = {
  onChange?: (
    input?: Pick<HomePageSearchInput, 'formattedAddress' | 'lat' | 'lng'>,
  ) => void;
};

const PlaceSearch: React.FC<PlaceSearchProps> = ({ onChange = () => {} }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) {
      return;
    }

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry?.location) {
      return;
    }
    onChange({
      formattedAddress: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  }, [onChange]);

  return (
    <div className="searchBox__item flex-1 border-r">
      <MapPinIcon width={24} height={24} fill={theme.colors?.gray[500]} />
      <Autocomplete
        className="flex-1 basis-full"
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={onPlaceChanged}
      >
        <Input />
      </Autocomplete>
    </div>
  );
};

export default PlaceSearch;
