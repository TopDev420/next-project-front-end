import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';
import ReservationKey from 'components/pages/my-page/property/ReservationKey';

const ReservationKeyPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [property, dispatch]);

  return <ReservationKey />;
};

export const getServerSideProps = getPropertyPageProps;

export default ReservationKeyPage;
