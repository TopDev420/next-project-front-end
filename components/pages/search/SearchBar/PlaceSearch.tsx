import React, { useRef, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PlaceSearchInputContainer, {
  PlaceSearchInput as Input,
} from 'components/pages/search/SearchBar/PlaceSearchInput';
import MapPinIcon from 'assets/images/icons/map-pin.svg';
import theme from 'constants/theme';
import { HomePageSearchInput } from 'lib/forms/search';
import { ensureBoundingBoxMinDistance } from 'lib/google/maps';

const Autocomplete = dynamic(() => import('components/AutoComplete'), {
  loading: () => <Input />,
  ssr: false,
});

type PlaceSearchProps = {
  address?: string;
  onChange?: (value: Partial<HomePageSearchInput>) => void;
};

const PlaceSearch: React.FC<PlaceSearchProps> = ({
  address,
  onChange = () => {},
}) => {
  const [formattedAddress, setFormattedAddress] = useState(address);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onPlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) {
      return;
    }
    setFormattedAddress(inputRef.current.value);

    const place = autocompleteRef.current.getPlace();

    if (!place?.geometry?.viewport) {
      return;
    }

    const { viewport } = place.geometry;
    const ne = viewport.getNorthEast();
    const sw = viewport.getSouthWest();

    onChange({
      formattedAddress: inputRef.current.value || place.formatted_address,
      boundingBox: ensureBoundingBoxMinDistance(
        [
          { lat: ne.lat(), lng: ne.lng() },
          { lat: sw.lat(), lng: sw.lng() },
        ],
        40000,
      ),
    });
  }, [onChange]);

  useEffect(() => {
    setFormattedAddress(address);
  }, [address]);

  return (
    <div className="searchBar__autoComplete">
      <MapPinIcon
        className="ml-2"
        width={18}
        height={18}
        fill={theme.colors?.gray[500]}
      />
      <Autocomplete
        className="flex-1 basis-full"
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={onPlaceChanged}
      >
        <PlaceSearchInputContainer
          ref={inputRef}
          value={formattedAddress}
          onChange={setFormattedAddress}
        />
      </Autocomplete>
    </div>
  );
};

export default PlaceSearch;
