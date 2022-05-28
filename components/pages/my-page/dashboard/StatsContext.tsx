import { createContext } from 'react';
import { DashboardStats } from 'types/models/Dashboard';

export const StatsContext = createContext<DashboardStats>(undefined);
