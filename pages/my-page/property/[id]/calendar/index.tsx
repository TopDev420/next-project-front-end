import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';
import { setValue } from 'lib/store/slices/my-page/property';
import Availability from 'components/pages/my-page/property/Availibility';

const PropertyCalendarPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Availability.Calendar />;
};

export const getServerSideProps = getPropertyPageProps;

export default PropertyCalendarPage;
