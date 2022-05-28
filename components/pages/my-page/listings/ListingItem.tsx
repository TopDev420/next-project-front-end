import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MyPagePropertyResource } from 'types/resources/Property';
import {
  getMyPagePropertyStepRoute,
  getPublicPropertyShowRoute,
} from 'lib/helpers/route';
import {
  PLAN_PRO_MONTHLY_ID,
  PLAN_PRO_YEARLY_ID,
  PROPERTY_STATUS_DRAFT,
  PROPERTY_STATUS_PUBLIC,
  SUBSCRIPTION_STATUS_SUBSCRIBED,
} from 'constants/master-types';
import {
  getPlanName,
  getSubscriptionStatusDisplayText,
} from 'lib/transformers/subscription';
import ImagePlaceholder from 'assets/images/image-placeholder.png';
import StatusBadge from 'components/pages/my-page/listings/StatusBadge';
import { sortImages } from 'lib/helpers/image';

type ListingItemProps = {
  data: MyPagePropertyResource;
  onStatusChange?: (status: number) => void;
  disabled?: boolean;
};

const ListingItem: React.FC<ListingItemProps> = ({
  data,
  onStatusChange = () => {},
  disabled,
}) => (
  <div className="flex flex-row py-4 border-b">
    <div className="relative w-32 h-24 mr-6">
      <Image
        layout="responsive"
        width={4}
        height={3}
        objectFit="cover"
        src={sortImages(data.images)[0]?.url || ImagePlaceholder.src}
        alt={data.title}
      />
    </div>
    <div className="flex flex-col flex-1 mr-4">
      <h4 className="mb-3 hover:underline">
        <Link href={getPublicPropertyShowRoute(data.id, data.slug)} passHref>
          <a target="_blank">{data.title}</a>
        </Link>
      </h4>
      <Link href={getMyPagePropertyStepRoute(data.id, 'calendar')}>
        <a className="text-red-700 hover:underline">
          Manage Listing and Calendar
        </a>
      </Link>
    </div>
    <div className="flex flex-col flex-initial w-36 text-sm">
      {!!data.subscription &&
        data.subscription.status === SUBSCRIPTION_STATUS_SUBSCRIBED && (
          <select
            disabled={disabled}
            className="p-1 border mb-2"
            value={data.status}
            onChange={(e) => onStatusChange(Number(e.target.value))}
          >
            <option value={PROPERTY_STATUS_PUBLIC}>Listed</option>
            <option value={PROPERTY_STATUS_DRAFT}>Unlisted</option>
          </select>
        )}
      {!!data.subscription ? (
        <div className="flex flex-row flex-wrap">
          <StatusBadge
            title={getPlanName(data.subscription.planId)}
            color={
              data.subscription.planId === PLAN_PRO_MONTHLY_ID ||
              data.subscription.planId === PLAN_PRO_YEARLY_ID
                ? 'yellow'
                : 'blue'
            }
            className="mb-2 mr-2 cursor-pointer"
            href={getMyPagePropertyStepRoute(data.id, 'publish')}
          />
          <StatusBadge
            title={getSubscriptionStatusDisplayText(data.subscription.status)}
            color={
              data.subscription.status === SUBSCRIPTION_STATUS_SUBSCRIBED
                ? 'blue'
                : 'dark'
            }
            className="mb-2 cursor-pointer"
            href={getMyPagePropertyStepRoute(data.id, 'publish')}
            inverted
          />
        </div>
      ) : (
        <div>
          <StatusBadge
            title="Unpublished"
            color="dark"
            className="cursor-pointer"
            href={getMyPagePropertyStepRoute(data.id, 'publish')}
          />
        </div>
      )}
    </div>
  </div>
);

export default ListingItem;
