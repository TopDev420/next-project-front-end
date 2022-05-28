import Block from 'components/pages/my-page/property/Availibility/EventModal/Block';
import Reservation from 'components/pages/my-page/property/Availibility/EventModal/Reservation';
import SeasonalPrice from 'components/pages/my-page/property/Availibility/EventModal/SeasonalPrice';

const Layout = [
  { title: 'Reservation', component: Reservation, modelType: 'Reservation' },
  {
    title: 'Seasonal Price',
    component: SeasonalPrice,
    modelType: 'SeasonalPrice',
  },
  { title: 'Block', component: Block, modelType: 'Block' },
] as const;

export default Layout;
