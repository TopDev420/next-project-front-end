import { useContext } from 'react';
import Image from 'next/image';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import Config from 'config';
import { getUrlWithParam } from 'lib/helpers/url';

const STATIC_GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap';

const Location = () => {
  const property = useContext(PropertyContext);
  if (!property.location) {
    return null;
  }

  const locationString = [property.location.lat, property.location.lng].join(
    ',',
  );

  // @see https://developers.google.com/maps/documentation/maps-static/start
  const param = {
    key: Config.GOOGLE_MAP_API_KEY,
    center: locationString,
    zoom: 13,
    size: '800x450',
    scale: 2,
    maptype: 'roadmap',
    markers: `size:medium|color:red|label:P|${locationString}`,
  };

  const imageUrl = getUrlWithParam(STATIC_GOOGLE_MAP_URL, param);

  return (
    <div className="mt-6">
      <Image width={16} height={9} layout="responsive" src={imageUrl} />
    </div>
  );
};

export default Location;
