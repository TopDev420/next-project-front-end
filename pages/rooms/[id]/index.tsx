import { GetServerSideProps } from 'next';
import * as propertyApi from 'lib/apis/property';
import PropertyPage from 'pages/rooms/[id]/[slug]';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  try {
    const property = await propertyApi.showProperty(id as any, req);
    return {
      redirect: {
        permanent: true,
        destination: getPublicPropertyShowRoute(id as string, property.slug),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default PropertyPage;
