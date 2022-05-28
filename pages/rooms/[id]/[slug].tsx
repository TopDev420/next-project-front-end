import { GetServerSideProps, NextPage } from 'next';
import * as propertyApi from 'lib/apis/property';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';
import { PropertyProvider } from 'components/pages/rooms/[id]/PropertyProvider';
import PageContent from 'components/pages/rooms/[id]';
import { PropertyDetailResource } from 'types/resources/Property';
import PageHead from 'components/Layouts/PageHead';

type PropertyPageProps = {
  property: PropertyDetailResource;
};

const PropertyPage: NextPage<PropertyPageProps> = ({ property }) => (
  <PropertyProvider property={property}>
    <PageHead {...property.seoMeta} />
    <PageContent />
  </PropertyProvider>
);

export const getServerSideProps: GetServerSideProps<
  PropertyPageProps
> = async ({ query, req }) => {
  const { id, slug } = query;
  try {
    const property = await propertyApi.showProperty<PropertyDetailResource>(
      id as any,
      req,
      true,
    );

    if (property.slug !== slug) {
      return {
        redirect: {
          permanent: true,
          destination: getPublicPropertyShowRoute(id as string, property.slug),
        },
      };
    }

    return {
      props: { property },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default PropertyPage;
