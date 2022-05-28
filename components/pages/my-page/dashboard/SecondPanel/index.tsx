import { Tab } from '@headlessui/react';
import RecentReservations from 'components/pages/my-page/dashboard/SecondPanel/RecentReservations';
import RecentTrips from 'components/pages/my-page/dashboard/SecondPanel/RecentTrips';
import { classNames } from 'lib/helpers/ui';

const getTabClassName = ({ selected }: { selected: boolean }) =>
  classNames(
    'px-4 py-2',
    selected ? 'bg-blue-900 text-white' : 'text-blue-900',
  );

const SecondPanel = () => (
  <div className="bg-white border shadow-lg p-6 border mt-6">
    <Tab.Group>
      <Tab.List>
        <Tab className={getTabClassName}>Recent Reservations</Tab>
        <Tab className={getTabClassName}>Recent Trips</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <RecentReservations />
        </Tab.Panel>
        <Tab.Panel>
          <RecentTrips />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </div>
);

export default SecondPanel;
