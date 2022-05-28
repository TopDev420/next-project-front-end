import React, { useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Config from 'config';
import { MarkerIconURL } from 'constants/googleMap';
import { libraries } from 'components/LocationSelect';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';

type LocationMapProps = {
  containerStyle?: React.CSSProperties;
  loadingContent?: React.ReactNode;
};

const LocationMap: React.FC<LocationMapProps> = ({
  containerStyle,
  loadingContent,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Config.GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const property = useContext(PropertyContext);

  const center = { lat: property?.location?.lat, lng: property?.location?.lng };

  return (
    <>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          <Marker position={center} icon={MarkerIconURL} />
        </GoogleMap>
      ) : (
        loadingContent
      )}
    </>
  );
};

export default LocationMap;
