import Layout from 'components/pages/my-page/property/Layout';
import UpdatePanel from 'components/pages/my-page/property/ReservationKey/UpdatePanel';

const ReservationKey = () => (
  <Layout step="reservation-key" hideSideBar hideTopBar>
    <UpdatePanel />
  </Layout>
);

export default ReservationKey;
