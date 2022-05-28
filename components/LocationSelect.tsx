import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import Config from 'config';
import convertGeocoderResultToAddress from 'lib/helpers/location';
import useGeolocation from 'lib/hooks/useGeolocation';
import { LocationSelectValue } from 'types/models/Location';
import { GeocodeService } from 'lib/google/maps/GeocodeService';
import { MarkerIconURL } from 'constants/googleMap';

export const DEFAULT_CONTAINER_STYLE = {
  width: '100%',
  height: '400px',
};

export const DEFAULT_CENTER = {
  lat: 40.7128,
  lng: -74.006,
};

type LocationSelectProps = {
  className?: string;
  containerStyle?: React.CSSProperties;
  value?: LocationSelectValue;
  onChange?: (value: LocationSelectValue) => void;
  getUserLocation?: boolean;
};

export const libraries: Array<'places'> = ['places'];

const LocationSelect: React.FC<LocationSelectProps> = ({
  className: propsClassName = 'my-4',
  containerStyle: containerPropsStyle = {},
  value,
  onChange = () => {},
  getUserLocation = true,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Config.GOOGLE_MAP_API_KEY!,
    libraries,
  });
  const { position } = useGeolocation(getUserLocation);

  const center = useMemo(
    () => (value ? { lat: value.lat, lng: value.lng } : DEFAULT_CENTER),
    [value],
  );

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();
  const searchInputRef = useRef<HTMLInputElement | null>();
  const geocodeServiceRef = useRef<GeocodeService>();

  const onLoad = useCallback((gmap) => {
    geocodeServiceRef.current = new GeocodeService();
    setMap(gmap);
  }, []);

  const onUnmount = useCallback((_gmap) => {
    setMap(null);
  }, []);

  const containerStyle = { ...DEFAULT_CONTAINER_STYLE, ...containerPropsStyle };

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!geocodeServiceRef.current) {
        return;
      }
      if (!e.latLng) {
        return;
      }

      const address = await geocodeServiceRef.current!.geocode({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      if (!address) {
        return;
      }

      onChange(address);
    },
    [onChange],
  );

  const handlePositionChange = useCallback(
    async (pos: GeolocationPosition | undefined) => {
      if (!geocodeServiceRef.current) {
        return;
      }
      if (!pos) {
        return;
      }

      const address = await geocodeServiceRef.current!.geocode({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

      if (address) {
        onChange(address);
      }
    },
    [onChange],
  );

  const handlePlaceChange = useCallback(() => {
    if (!autocompleteRef.current) {
      return;
    }

    const place = autocompleteRef.current.getPlace();
    if (!place.address_components || !place.geometry?.location) {
      return;
    }

    const address = convertGeocoderResultToAddress(
      place as google.maps.GeocoderResult,
      {
        lat: place.geometry!.location!.lat(),
        lng: place.geometry!.location!.lng(),
      },
    );

    if (address) {
      onChange(address);
    }
  }, [onChange]);

  useEffect(() => {
    if (position && getUserLocation) {
      handlePositionChange(position);
    }
  }, [getUserLocation, handlePositionChange, position]);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.value = value.formattedAddress;
  }, [value]);

  return (
    <div className={propsClassName}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          {!!map && (
            <Autocomplete
              onLoad={(ref) => {
                autocompleteRef.current = ref;
              }}
              onPlaceChanged={handlePlaceChange}
            >
              <input
                type="text"
                ref={(ref) => {
                  searchInputRef.current = ref;
                }}
                className="googleMap__autoComplete border-1 rounded shadow py-2 px-4 outline-none overflow-ellipsis absolute mx-auto inset-x-0"
              />
            </Autocomplete>
          )}
          {!!value && <Marker position={value} icon={MarkerIconURL} />}
        </GoogleMap>
      ) : (
        <div style={containerStyle} className="bg-gray-300" />
      )}
    </div>
  );
};

export default LocationSelect;
