import BurgerMenu from 'components/NavBar/BurgerMenu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NavItem } from 'types/NavItem';
import Leaf from 'components/NavBar/Leaf';

const NavBarSm: React.FC<{ navs: NavItem[] }> = ({ navs }) => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleSelectItem = (item: string) => {
    if (item === selectedItem) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(item);
    }
  };

  useEffect(() => {
    setIsOpened(false);
    setSelectedItem(undefined);
  }, [router.asPath]);

  return (
    <>
      <BurgerMenu
        isOpened={isOpened}
        onClick={() => setIsOpened((old) => !old)}
      />
      <ul className="navbar-sm flex flex-1 flex-col">
        {navs.map((item) => (
          <li
            className={`navbar-item ${
              isOpened ? 'h-auto' : 'h-0'
            } text-gray-600 text-sm flex flex-col overflow-hidden uppercase`}
            key={item.key}
          >
            {item.children ? (
              <button
                type="button"
                className="flex justify-between items-center uppercase py-3 px-4"
                onClick={() => handleSelectItem(item.key)}
              >
                {item.title}
                <span className="navbar-item--caret" />
              </button>
            ) : (
              <Leaf additionalClass="py-3 px-4" item={item} />
            )}
            {!!item.children && (
              <ul
                className={`navbar-item--menu w-full pl-4 ${
                  selectedItem === item.key ? 'open' : 'closed'
                }`}
              >
                {item.children.map((childItem) => (
                  <li
                    className="text-gray-600 text-sm italic w-full"
                    key={childItem.key}
                  >
                    <Leaf additionalClass="py-3 px-4" item={childItem} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavBarSm;
