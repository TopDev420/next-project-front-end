import { NextPageContext } from 'next';
import { get, getServerSidePropsRequestHeader } from 'lib/helpers/api';
import { HomePageProps } from 'types/pages/home';

export const getHomePageProps = (req: NextPageContext['req']) =>
  get<HomePageProps>('home', undefined, getServerSidePropsRequestHeader(req));
