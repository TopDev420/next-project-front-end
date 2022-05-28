/* eslint-disable react/no-danger */
import PageHead from 'components/Layouts/PageHead';
import { GetServerSideProps, NextPage } from 'next';
import { Destination } from 'types/models/Destination';
import destinations from 'static/destinations.json';
import Image from 'next/image';
import PropertyItem from 'components/pages/search/SearchResult/PropertyList/PropertyItem';
import { getDestinationProperties } from 'lib/apis/destination';
import { PropertySearchResource } from 'types/resources/Property';
import SubDestinationImage from 'assets/images/subdestination-seperator.svg';
import Link from 'next/link';

export type DestinationPageProps = {
  destination: Destination;
  properties: PropertySearchResource[];
};
const DestinationPage: NextPage<DestinationPageProps> = ({
  destination,
  properties,
}) => (
  <>
    <PageHead
      title={destination.title}
      description={destination.description}
      keywords={destination.keywords}
    />
    <div className="destination-page">
      <div className="container-fluid relative">
        <div className="media-container relative flex justify-center">
          <div className="bg-source pos-absolute-0">
            <div className="bg-no-repeat bg-cover pos-absolute-0">
              {destination.banner && (
                <Image
                  src={destination.banner?.url || ''}
                  alt={destination.banner?.metadata?.alt}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-80"
                />
              )}
            </div>
            <div className="bg-overlay pos-absolute-0" />
            <div className="bg-overlay-gloss" />
          </div>
          <div className="media-content flex flex-col justify-center">
            <div className="text-center svg-text relative">
              <svg
                height="70"
                width="400"
                xmlnsXlink="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" height="70" width="400" />
              </svg>
              <div className="content-features pos-absolute-0 text-white w-100 h-100">
                <span className="text-white inline-block">
                  {destination.title}
                </span>
                {destination.subtitle && (
                  <p className="mt-4 font-thin">{destination.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="destination-content bg-gray-100 relative">
        <div className="max-w-screen-lg mx-auto py-6 flex justify-center px-2">
          <div
            className="callout-banner"
            dangerouslySetInnerHTML={{ __html: destination.content }}
          />
        </div>
        <div className="seperator" />
      </section>
      <section className="properties-content bg-gray-100 relative">
        <div className="max-w-screen-lg properties-content__container mx-auto py-6 flex flex-col px-2">
          <div className="properties-content__title mb-8">
            <h2 className="text-gray-700 border-b-2 border-gray-300 pb-2 font-bold text-2xl">
              <span className="text-blue-500 border-b-2 border-blue-500 pb-2">
                {destination.location}
              </span>{' '}
              Vacation Rentals
            </h2>
          </div>
          <div className="properties-content__content">
            <div>
              {properties.map((property) => (
                <PropertyItem
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  data={property}
                  key={property.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="subdestination-seperator">
          <SubDestinationImage />
        </div>
      </section>
      {destination.children?.length > 0 && (
        <section className="destination-child">
          <div className="p-12 flex justify-center gap-x-8">
            {destination.children.map((item) => (
              <h2 className="text-blue-900 font-bold text-3xl">
                <Link href={`/destinations/${item.slug}`}>{item.title}</Link>
              </h2>
            ))}
          </div>
        </section>
      )}
    </div>
  </>
);

export default DestinationPage;

export const getServerSideProps: GetServerSideProps<
  DestinationPageProps
> = async ({ query }) => {
  let allDestinations = [...destinations] as Destination[];
  destinations.forEach((destination) => {
    if (destination.children && destination.children.length) {
      allDestinations = [...allDestinations, ...destination.children];
    }
  });
  const destination = allDestinations.find((item) => item.slug === query.slug);
  if (!destination) {
    return {
      notFound: true,
    };
  }
  let properties = [];
  if (destination.location) {
    properties = await getDestinationProperties(destination.location);
  }
  return { props: { destination, properties } };
};
