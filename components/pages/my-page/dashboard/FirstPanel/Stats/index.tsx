import { Tab } from '@headlessui/react';
import ListingStats from 'components/pages/my-page/dashboard/FirstPanel/Stats/ListingStats';
import TripStats from 'components/pages/my-page/dashboard/FirstPanel/Stats/TripStats';
import { classNames } from 'lib/helpers/ui';

const getTabClassName = ({ selected }: { selected: boolean }) =>
  classNames(
    'px-4 py-2',
    selected ? 'bg-blue-900 text-white' : 'text-blue-900',
  );

const Stats = () => (
  <Tab.Group>
    <Tab.List className="border-b">
      <Tab className={getTabClassName}>My Listings</Tab>
      <Tab className={getTabClassName}>My Trips</Tab>
    </Tab.List>
    <Tab.Panels className="mt-4">
      <Tab.Panel>
        <ListingStats />
      </Tab.Panel>
      <Tab.Panel>
        <TripStats />
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
);

export default Stats;
