/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useMemo, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap as BaseGoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Config from 'config';
import {
  DEFAULT_CENTER,
  DEFAULT_CONTAINER_STYLE,
  libraries,
} from 'components/LocationSelect';
import { MarkerIconURL, ActiveMarkerIconURL } from 'constants/googleMap';
import InfoWindowContent from 'components/pages/search/SearchResult/SearchMap/InfoWindowContent';
import useGeolocation from 'lib/hooks/useGeolocation';
import {
  boundsEqualCanonically,
  convertBoundingBoxToLatLngBounds,
  convertLatLngBoundsToBoundingBox,
  getMapBounds,
} from 'lib/google/maps';
import { MapProps } from 'components/pages/search/SearchResult/types';

type GoogleMapProps = {
  containerStyle?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement> &
  MapProps;

const GoogleMap: React.FC<GoogleMapProps> = ({
  containerStyle: propsContainerStyle,
  onMapBoundsChanged,
  properties = [],
  highlightItemId,
  initialProperties = [],
  boundingBox,
  ...props
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Config.GOOGLE_MAP_API_KEY!,
    libraries,
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { position: _currentPosition } = useGeolocation(true);

  const currentPosition = useMemo(() => {
    if (!_currentPosition) {
      return null;
    }
    return {
      lat: _currentPosition.coords.latitude,
      lng: _currentPosition.coords.longitude,
    };
  }, [_currentPosition]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerMap, setMarkerMap] = useState<
    Record<number, google.maps.Marker>
  >({});
  const [selectedId, setSelectedId] = useState<number>();

  const containerStyle = useMemo(
    () => ({ ...DEFAULT_CONTAINER_STYLE, ...propsContainerStyle }),
    [propsContainerStyle],
  );

  const selectedProperty = useMemo(() => {
    if (!selectedId) {
      return null;
    }

    return properties.find(({ id }) => id === selectedId);
  }, [properties, selectedId]);

  /**
   * hack to close InfoWindow and open new one
   */
  const onMarkerClick = (id: number | undefined) => {
    setSelectedId(undefined);
    if (id) {
      setTimeout(() => setSelectedId(() => id), 0);
    }
  };

  const onMarkerLoad = (marker: google.maps.Marker, id: number) => {
    setMarkerMap((old) => ({ ...old, [id]: marker }));
    window.google.maps.event.addListener(marker, 'map_changed', function () {
      if (!this.getMap()) {
        setSelectedId(undefined);
      }
    });
  };

  const onMarkerUnmount = (marker: google.maps.Marker, id: number) => {
    window.google.maps.event.clearListeners(marker, 'map_changed');
    if (!selectedProperty) {
      return;
    }
    if (selectedProperty.id === id) {
      setSelectedId(undefined);
    }
  };

  const center = useMemo(() => {
    if (currentPosition) {
      return currentPosition;
    }
    return DEFAULT_CENTER;
  }, [currentPosition]);

  const anchor = markerMap[selectedId];

  useEffect(() => {
    if (!map || typeof window === 'undefined') {
      return;
    }
    const resultLocations = initialProperties
      .filter((item) => !!item.location)
      .map((item) => ({ lat: item.location.lat, lng: item.location.lng }));

    if (!resultLocations?.length) {
      return;
    }

    const bounds = getMapBounds({
      locations: resultLocations,
    });

    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [currentPosition, initialProperties, map]);

  useEffect(() => {
    if (!map || !boundingBox) {
      return;
    }

    const mapBounds = map.getBounds();
    if (
      boundsEqualCanonically(
        convertLatLngBoundsToBoundingBox(mapBounds),
        boundingBox,
      )
    ) {
      return;
    }

    const newBound = convertBoundingBoxToLatLngBounds(boundingBox);
    map.fitBounds(newBound);
  }, [boundingBox, map]);

  /**
   * bind/unbind events on google map change
   */
  useEffect(() => {
    if (map && window.google) {
      window.google.maps.event.addListener(map, 'dragend', () => {
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        onMapBoundsChanged([
          { lat: ne.lat(), lng: ne.lng() },
          { lat: sw.lat(), lng: sw.lng() },
        ]);
      });
    }
    return () => {
      if (window.google && map) {
        window.google.maps.event.clearListeners(map, 'dragend');
      }
    };
  }, [map, onMapBoundsChanged]);

  return (
    <div {...props}>
      {isLoaded ? (
        <BaseGoogleMap
          onLoad={setMap}
          onUnmount={() => setMap(null)}
          zoom={10}
          center={center}
          mapContainerStyle={containerStyle}
        >
          {properties.map(({ location, id }) => (
            <Marker
              key={id}
              position={{ lat: location.lat, lng: location.lng }}
              icon={
                id === highlightItemId ? ActiveMarkerIconURL : MarkerIconURL
              }
              onClick={() => onMarkerClick(id)}
              onLoad={(marker) => onMarkerLoad(marker, id)}
              onUnmount={(marker) => onMarkerUnmount(marker, id)}
            />
          ))}
          {!!selectedId && !!selectedProperty && (
            <InfoWindow
              anchor={anchor}
              position={
                anchor
                  ? undefined
                  : {
                      lat: selectedProperty?.location?.lat,
                      lng: selectedProperty?.location?.lng,
                    }
              }
              onCloseClick={() => setSelectedId(undefined)}
            >
              <InfoWindowContent data={selectedProperty} />
            </InfoWindow>
          )}
        </BaseGoogleMap>
      ) : (
        <div style={containerStyle} className="bg-gray-300" />
      )}
    </div>
  );
};

export default GoogleMap;
