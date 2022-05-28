import Leaf from 'components/NavBar/Leaf';
import React from 'react';
import { NavItem } from 'types/NavItem';

const NavBarMd: React.FC<{ navs: NavItem[] }> = ({ navs }) => (
  <ul className="flex flex-1 justify-end">
    {navs.map((item) => (
      <li
        className="navbar-item flex relative justify-center items-center uppercase hover:text-white hover:bg-blue-500 cursor-pointer px-5 duration-75"
        key={item.key}
      >
        {!!item.children ? (
          <>
            {item.title}
            <span className="navbar-item--caret" />
            <ul className="navbar-item--menu absolute py-2 bg-white shadow duration-75 z-50">
              {item.children.map((childItem) => (
                <li
                  className="text-gray-600 text-sm italic hover:pl-6 hover:bg-blue-500 hover:text-white duration-100"
                  key={childItem.key}
                >
                  <Leaf additionalClass="px-4 py-3" item={childItem} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Leaf item={item} />
        )}
      </li>
    ))}
  </ul>
);
export default NavBarMd;
