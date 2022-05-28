import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { myPagePropertySelector } from 'lib/store/selectors/my-page/property';

type TabsProps = {
  tab: 'agenda' | 'calendar' | 'rooms';
};

const Tabs: React.FC<TabsProps> = ({ tab = 'calendar' }) => {
  const router = useRouter();
  const property = useSelector(myPagePropertySelector);

  return (
    <div className="flex flex-row mb-4">
      {property !== null && property.roomsCount > 1 && (
        <button
          className={`px-6 py-3 ${
            tab === 'agenda'
              ? 'bg-blue-900 text-white'
              : 'bg-white text-blue-900'
          }`}
          type="button"
          onClick={() =>
            router.push(`/my-page/property/${property?.id}/agenda`)
          }
        >
          All Rooms
        </button>
      )}
      <button
        className={`px-6 py-3 ${
          tab === 'calendar'
            ? 'bg-blue-900 text-white'
            : 'bg-white text-blue-900'
        }`}
        type="button"
        onClick={() =>
          router.push(`/my-page/property/${property?.id}/calendar`)
        }
      >
        Calendar
      </button>
      <button
        className={`px-6 py-3 ${
          tab === 'rooms' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'
        }`}
        type="button"
        onClick={() => router.push(`/my-page/property/${property?.id}/rooms`)}
      >
        Name & iCal
      </button>
    </div>
  );
};

export default Tabs;
