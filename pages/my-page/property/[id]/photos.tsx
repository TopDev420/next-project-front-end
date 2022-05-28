import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';
import Photos from 'components/pages/my-page/property/Photos';

const PhotosPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Photos />;
};

export const getServerSideProps = getPropertyPageProps;

export default PhotosPage;
