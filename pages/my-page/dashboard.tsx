import { NextPage, GetServerSideProps } from 'next';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import PageContent from 'components/pages/my-page/dashboard/index';
import { StatsContext } from 'components/pages/my-page/dashboard/StatsContext';
import { DashboardStats } from 'types/models/Dashboard';
import * as dashboardApi from 'lib/apis/dashboard';

type PageProps = {
  stats: DashboardStats;
};

const Dashboard: NextPage<PageProps> = ({ stats }) => (
  <DashboardLayout>
    <StatsContext.Provider value={stats}>
      <PageContent />
    </StatsContext.Provider>
  </DashboardLayout>
);

export default Dashboard;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
}) => {
  const stats = await dashboardApi.getDashboardStats(req);
  return {
    props: { stats },
  };
};
