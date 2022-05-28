import { NextPage } from 'next';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import PageContent from 'components/pages/my-page/profile';

const Profile: NextPage = () => (
  <DashboardLayout>
    <PageContent />
  </DashboardLayout>
);

export default Profile;
