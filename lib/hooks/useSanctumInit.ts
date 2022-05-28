import { useEffect } from 'react';
import { sanctum } from 'lib/store/slices/sanctum';
import { useDispatch } from 'react-redux';

const useSanctumInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sanctum());
  }, [dispatch]);
};

export default useSanctumInit;
