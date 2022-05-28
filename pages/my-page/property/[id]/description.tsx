import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import Description from 'components/pages/my-page/property/Description';
import { setValue } from 'lib/store/slices/my-page/property';
import {
  EditRoomProps,
  getPropertyPageProps,
} from 'components/pages/my-page/property/common';

const DescriptionPage: NextPage<EditRoomProps> = ({ property }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setValue(property));
  }, [dispatch, property]);

  return <Description />;
};

export const getServerSideProps = getPropertyPageProps;

export default DescriptionPage;
