import { useContext } from 'react';
import StatItem from 'components/pages/my-page/dashboard/FirstPanel/Stats/StatItem';
import { StatsContext } from 'components/pages/my-page/dashboard/StatsContext';

const ListingStats = () => {
  const { stats } = useContext(StatsContext);
  return (
    <div>
      <StatItem
        title="Reservation Requests"
        route="reservations"
        figure={stats.pendingReservationCount}
      />
      <StatItem
        title="Upcoming Reservations"
        route="reservations"
        figure={stats.upcomingReservationCount}
      />
      <StatItem
        title="Current Reservations"
        route="reservations"
        figure={stats.currentReservationCount}
      />
      <StatItem
        title="Total Listings"
        route="listings"
        figure={stats.listingCount}
      />
    </div>
  );
};

export default ListingStats;
