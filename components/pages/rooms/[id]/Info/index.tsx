import About from 'components/pages/rooms/[id]/Info/About';
import Host from 'components/pages/rooms/[id]/Info/Host';
import Location from 'components/pages/rooms/[id]/Info/Location';
import Video from 'components/pages/rooms/[id]/Info/Video';

const Info = () => (
  <div className="my-4 flex flex-col">
    <About />
    <Host />
    <Video />
    <Location />
  </div>
);

export default Info;
