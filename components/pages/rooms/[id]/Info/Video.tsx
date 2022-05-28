import { useContext } from 'react';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import YoutubeEmbed from 'components/YoutubeEmbed';

const Video = () => {
  const property = useContext(PropertyContext);

  if (!property?.video) {
    return null;
  }

  return (
    <div className="mb-6">
      <YoutubeEmbed src={property.video} />
    </div>
  );
};

export default Video;
