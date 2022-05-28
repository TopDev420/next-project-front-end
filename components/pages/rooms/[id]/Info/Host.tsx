import { useContext } from 'react';
import Image from 'next/image';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import PersonIcon from 'assets/images/icons/person.svg';
import theme from 'constants/theme';

const Host = () => {
  const property = useContext(PropertyContext);

  if (!property?.host) {
    return null;
  }

  const { host } = property;

  return (
    <div className="flex flex-row my-6 bg-gray-100" id="host">
      <div className="flex flex-initial flex-col p-4 pr-0">
        {!!host.imageUrl ? (
          <Image width={48} height={48} objectFit="cover" src={host.imageUrl} />
        ) : (
          <PersonIcon width={48} height={48} fill={theme?.colors?.gray[500]} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <strong className="uppercase">{host.fullName}</strong>
        <p>{host.address}</p>
      </div>
    </div>
  );
};

export default Host;
