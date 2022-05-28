import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';
import Availibility from 'components/pages/my-page/property/Availibility';

const RoomsPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Availibility.Rooms />;
};

export const getServerSideProps = getPropertyPageProps;

export default RoomsPage;
