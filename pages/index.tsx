import type { GetServerSideProps, NextPage } from 'next';
import HomePage from 'components/pages/home';
import { HomePageProps } from 'types/pages/home';
import * as homePageApi from 'lib/apis/home-page';

const Home: NextPage<HomePageProps> = (props) => <HomePage {...props} />;

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  req,
}) => {
  const props = await homePageApi.getHomePageProps(req);

  return { props };
};
