import React from 'react';
import Layout, { LayoutProps } from 'components/pages/my-page/property/Layout';
import Rooms from 'components/pages/my-page/property/Availibility/Rooms/Rooms';
import Tabs from 'components/pages/my-page/property/Availibility/Tabs';

const RoomsContainer: React.FC<LayoutProps> = ({
  title = 'Listing Availability',
  description = 'Use the calendar below to restrict your listing availability and create custom seasonal pricing for specific dates.',
}) => (
  <Layout step="calendar" title={title} description={description} hideSideBar>
    <Tabs tab="rooms" />
    <Rooms />
  </Layout>
);

export default RoomsContainer;
