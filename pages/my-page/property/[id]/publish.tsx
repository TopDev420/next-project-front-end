import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';
import Publish from 'components/pages/my-page/property/Publish';

const PublishPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Publish />;
};

export const getServerSideProps = getPropertyPageProps;

export default PublishPage;
