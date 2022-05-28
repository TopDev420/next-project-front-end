import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, NextPage } from 'next';
import { setValue } from 'lib/store/slices/my-page/property';
import Availability from 'components/pages/my-page/property/Availibility';
import { showPropertyRoom } from 'lib/apis/property';
import { Property } from 'types/models/Property';
import { Room } from 'types/models/Room';
import { updateRoom } from 'lib/store/slices/my-page/room';

const PropertyCalendarPage: NextPage<{ property: Property; room: Room }> = ({
  property,
  room,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  useEffect(() => {
    dispatch(updateRoom(room));
  }, [dispatch, room]);

  return <Availability.Calendar />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id, roomId } = query;
  try {
    const { property, room } = await showPropertyRoom(
      id as any,
      roomId as any,
      req,
    );

    return { props: { property, room } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default PropertyCalendarPage;
