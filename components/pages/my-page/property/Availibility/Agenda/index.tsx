import React from 'react';
import Layout, { LayoutProps } from 'components/pages/my-page/property/Layout';
import Tabs from 'components/pages/my-page/property/Availibility/Tabs';
import Agendas from './Agendas';

const Agenda: React.FC<LayoutProps> = ({
  title = 'Listing Availability',
  description = 'Use the calendar below to restrict your listing availability and create custom seasonal pricing for specific dates.',
}) => (
  <Layout step="calendar" title={title} description={description} hideSideBar>
    <Tabs tab="agenda" />
    <Agendas />
  </Layout>
);

export default Agenda;
