import { get, getServerSidePropsRequestHeader } from 'lib/helpers/api';
import { GetServerSidePropsContext } from 'next';
import { DashboardStats } from 'types/models/Dashboard';

export const getDashboardStats = (req?: GetServerSidePropsContext['req']) => {
  if (req) {
    return get<DashboardStats>(
      'dashboard',
      undefined,
      getServerSidePropsRequestHeader(req),
    );
  }
  return get<DashboardStats>('dashboard');
};
