import { useDispatch } from 'react-redux';

export type NavItem = {
  key: string;
  title: string;
  url?: string;
  action?: Parameters<ReturnType<typeof useDispatch>>[0];
  visibility?: 'all' | 'anonymous' | 'user';
  children?: NavItem[];
};
