import { useContext } from 'react';
import StatItem from 'components/pages/my-page/dashboard/FirstPanel/Stats/StatItem';
import { StatsContext } from 'components/pages/my-page/dashboard/StatsContext';

const TripStats = () => {
  const { stats } = useContext(StatsContext);

  return (
    <div>
      <StatItem
        title="Pending Requests"
        route="trips"
        figure={stats.pendingTripCount}
      />
      <StatItem
        title="Upcoming Trips"
        route="trips"
        figure={stats.upcomingTripCount}
      />
      <StatItem
        title="Current Trips"
        route="trips"
        figure={stats.currentTripCount}
      />
    </div>
  );
};

export default TripStats;
