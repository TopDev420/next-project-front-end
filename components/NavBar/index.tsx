import Logo from 'components/NavBar/Logo';
import NavBarSm from 'components/NavBar/NavBarSm';
import NavBarMd from 'components/NavBar/NavBarMd';
import React, { useMemo } from 'react';
import { NavItem } from 'types/NavItem';
import { currentUserSelector } from 'lib/store/selectors/user';
import Nav from 'constants/nav';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const NavBar: React.FC = () => {
  const user = useSelector(currentUserSelector);
  const visibility = !!user ? 'user' : 'anonymous';

  const navs = useMemo(() => {
    const newNavs: NavItem[] = [];
    Nav.forEach((nav) => {
      if (
        !nav.visibility ||
        nav.visibility === 'all' ||
        nav.visibility === visibility
      ) {
        if (nav.children) {
          const filteredChildren = nav.children?.filter((child) => {
            if (
              !child.visibility ||
              child.visibility === 'all' ||
              child.visibility === visibility
            ) {
              if (
                child.key === 'import-reservation-key' &&
                (!user || !user.rkId)
              ) {
                return false;
              }
              return true;
            }
            return false;
          });

          if (filteredChildren.length) {
            newNavs.push({ ...nav, children: filteredChildren });
          }
        } else {
          newNavs.push(nav);
        }
      }
    });
    return newNavs;
  }, [user, visibility]);

  return (
    <header className="fixed top-0 bg-white w-full z-40">
      <div className="container mx-auto flex flex-col md:flex-row ">
        <Logo />
        <nav className="flex md:hidden">
          <NavBarSm navs={navs} />
        </nav>
        <nav className="hidden md:flex flex-1">
          <NavBarMd navs={navs} />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
