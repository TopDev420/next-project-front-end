import { showProperty } from 'lib/apis/property';
import { GetServerSideProps } from 'next';
import { Property } from 'types/models/Property';

export type EditRoomProps = {
  property: Property;
};

export const getPropertyPageProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  try {
    const property = await showProperty(id as any, req);

    return {
      props: { property },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
