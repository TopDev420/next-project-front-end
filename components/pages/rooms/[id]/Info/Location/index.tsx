import StaticImage from 'components/pages/rooms/[id]/Info/Location/StaticImage';
import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('components/pages/rooms/[id]/Info/Location/Map'),
  {
    ssr: false,
    loading: StaticImage,
  },
);

const Location = () => (
  <div id="location" className="mb-6">
    <Map
      containerStyle={{ width: '100%', aspectRatio: '16/9' }}
      loadingContent={<StaticImage />}
    />
  </div>
);

export default Location;
