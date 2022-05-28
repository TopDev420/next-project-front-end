import {
  RecentReservationResource,
  RecentTripResource,
} from 'types/resources/Reservation';

export type DashboardStats = {
  stats: {
    pendingReservationCount: number;
    upcomingReservationCount: number;
    currentReservationCount: number;
    pendingTripCount: number;
    upcomingTripCount: number;
    currentTripCount: number;
    listingCount: number;
  };
  recentReservations: RecentReservationResource[];
  recentTrips: RecentTripResource[];
};
