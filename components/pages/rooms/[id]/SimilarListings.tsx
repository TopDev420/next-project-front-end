import { useContext } from 'react';
import Link from 'next/link';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import ImageSlider from 'components/ImageSlider';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';
import { formatPrice } from 'lib/helpers/number';
import { PRICE_TYPE_NIGHTLY_RATES } from 'constants/master-types';

const SimilarListings = () => {
  const property = useContext(PropertyContext);

  if (!property?.similar?.length) {
    return null;
  }

  return (
    <div className="my-6">
      <h3 className="mb-4">Similar Listings</h3>
      <div className="flex flex-row flex-no-wrap overflow-x-auto">
        {property.similar.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mr-4 border flex flex-col"
          >
            <div className="relative felx-initial">
              <ImageSlider images={item.images} />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h4 className="hover:underline cursor:pointer text-sm flex-1 justify-between">
                <Link href={getPublicPropertyShowRoute(item.id, item.slug)}>
                  {item.title}
                </Link>
              </h4>
              <div className="flex-initial">
                {item.price.priceTypeId === PRICE_TYPE_NIGHTLY_RATES &&
                !!item.price ? (
                  <span className="font-bold">
                    {formatPrice(item.price.amountNight)}
                  </span>
                ) : (
                  <span>Call for price</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarListings;
