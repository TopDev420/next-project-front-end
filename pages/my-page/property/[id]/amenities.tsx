import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import Amenities from 'components/pages/my-page/property/Amenities';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';

const AmenitiesPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Amenities />;
};

export const getServerSideProps = getPropertyPageProps;

export default AmenitiesPage;
