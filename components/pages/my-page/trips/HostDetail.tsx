import React from 'react';
import Image from 'next/image';
import { MyPageTripResource } from 'types/resources/Reservation';
import theme from 'constants/theme';
import LabelWithIcon from 'components/pages/my-page/LabelWithIcon';
import AvatarIcon from 'assets/images/icons/person.svg';
import EmailIcon from 'assets/images/icons/email.svg';
import PhoneIcon from 'assets/images/icons/phone.svg';

type HostDetailProps = {
  data: MyPageTripResource['host'];
};

const HostDetail: React.FC<HostDetailProps> = ({ data }) => (
  <div className="mt-2 flex flex-row">
    <div className="mr-4">
      {!!data.imageUrl ? (
        <Image width={36} height={36} objectFit="cover" src={data.imageUrl} />
      ) : (
        <AvatarIcon width={36} height={36} fill={theme?.colors?.gray[500]} />
      )}
    </div>
    <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-sm">
      <p className="col-span-2">{data.fullName}</p>
      {!!data?.email && (
        <LabelWithIcon
          Icon={EmailIcon}
          title={
            <a className="hover:underline" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          }
        />
      )}
      {!!data?.phone && (
        <LabelWithIcon
          Icon={PhoneIcon}
          title={
            <a className="hover:underline" href={`tel:${data.phone}`}>
              {data.phone}
            </a>
          }
        />
      )}
    </div>
  </div>
);

export default HostDetail;
