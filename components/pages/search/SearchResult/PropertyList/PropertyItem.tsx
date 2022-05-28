/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Flags from 'country-flag-icons/react/3x2';
import { PropertySearchResource } from 'types/resources/Property';
import { formatPrice } from 'lib/helpers/number';
import { PRICE_TYPE_NIGHTLY_RATES } from 'constants/master-types';
import LocationSummary from 'components/pages/search/SearchResult/PropertyList/LocationSummary';
import CapacitySummary from 'components/pages/search/SearchResult/PropertyList/CapacitySummary';
import BestPriceGuarantee from 'assets/images/bpg.png';
import { getPublicPropertyShowRoute, getSearchRoute } from 'lib/helpers/route';
import { convertCountryCodeToFullName } from 'lib/transformers/location';
import ImageSlider from 'components/ImageSlider';

type PropertyItemProps = {
  data: PropertySearchResource;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const PropertyItem: React.FC<PropertyItemProps> = ({
  data,
  onMouseEnter,
  onMouseLeave,
}) => {
  const Flag = Flags[data?.location?.countryCode || 'ZZ'];

  return (
    <div
      className="propertyItem"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="propertyItem__slide">
        <ImageSlider images={data?.images} />
      </div>
      <div className="propertyItem__content">
        <div className="flex flex-1 flex-row items-start p-4">
          <Link
            href={getSearchRoute({
              formattedAddress: convertCountryCodeToFullName(
                data?.location?.countryCode,
              ),
            })}
          >
            <a
              style={{ width: 28, height: 24 }}
              className="mr-2 cursor-pointer"
            >
              {!!Flag ? <Flag width={24} height={24} /> : null}
            </a>
          </Link>
          <div className="flex flex-col flex-1">
            <h3 className="propertyItem__title">
              <Link href={getPublicPropertyShowRoute(data.id, data.slug)}>
                {data.title || data.location?.addressLine1}
              </Link>
            </h3>
            <LocationSummary location={data.location} />
            <CapacitySummary
              bedroomsCount={data.bedroomsCount}
              bathroomsCount={data.bathroomsCount}
              roomsCount={data.roomsCount}
            />
          </div>
        </div>
        <div className="flex-initial border-t flex items-center px-4 py-2">
          {data.priceTypeId === PRICE_TYPE_NIGHTLY_RATES && !!data.price ? (
            <span className="font-bold">{formatPrice(data.price)}</span>
          ) : (
            <span>Call for price</span>
          )}
        </div>
        {data.bpg && (
          <div className="absolute right-2 bottom-2">
            <Image
              src={BestPriceGuarantee.src}
              width={45}
              height={72}
              layout="fixed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyItem;
