import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem: React.FC<{ route: string; title: string }> = ({
  route,
  title,
}) => {
  const router = useRouter();
  const active = router.route.includes(route);

  return (
    <li
      className={`dashboardNav__item ${
        active ? 'dashboardNav__item--active' : ''
      }`}
    >
      <Link href={`/my-page/${route}`}>{title}</Link>
    </li>
  );
};

const DashboardLayout: React.FC = ({ children }) => (
  <div className="dashboard">
    <nav className="dashboardNav">
      <ul>
        <NavItem route="dashboard" title="Dashboard" />
        <NavItem route="listings" title="Your Listings" />
        <NavItem route="reservations" title="Your Reservations" />
        <NavItem route="trips" title="Your Trips" />
        <NavItem route="profile" title="Profile" />
        <NavItem route="update" title="Update" />
      </ul>
    </nav>
    <div className="dashboardContent">{children}</div>
  </div>
);

export default DashboardLayout;
