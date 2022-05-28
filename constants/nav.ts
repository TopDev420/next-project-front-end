import { syncReservation } from 'lib/store/slices/reservation-import';
import { presentModal } from 'lib/store/slices/ui';
import { logout } from 'lib/store/slices/user';
import { NavItem } from 'types/NavItem';

const Nav: NavItem[] = [
  {
    key: 'login',
    title: 'Log In',
    visibility: 'anonymous',
    action: presentModal({ type: 'login' }),
  },
  {
    key: 'signup',
    title: 'Sign Up',
    visibility: 'anonymous',
    action: presentModal({ type: 'signup' }),
  },
  {
    key: 'help',
    title: 'Help',
    url: '/faq',
  },
  {
    key: 'my-page',
    title: 'My Page',
    visibility: 'user',
    children: [
      {
        key: 'dashboard',
        title: 'Dashboard',
        url: '/my-page/dashboard',
      },
      {
        key: 'profile',
        title: 'Profile',
        url: '/my-page/profile',
      },
      {
        key: 'import-reservation-key',
        title: 'Update',
        url: '/my-page/update',
      },
      {
        key: 'logout',
        title: 'Logout',
        // @ts-ignore
        action: logout(),
      },
    ],
  },
  {
    key: 'contact-us',
    title: 'Contact Us',
    url: '/contactus',
  },
  {
    key: 'list-your-home',
    title: 'List Your Home',
    url: '/rooms/new',
  },
];

export default Nav;
