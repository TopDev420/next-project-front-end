import React from 'react';

type BurgerMenuProps = {
  isOpened?: boolean;
  onClick?: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpened = false,
  onClick = () => {},
}) => (
  <button
    type="button"
    aria-label="Menu"
    className={`burger-menu burger-menu__${
      isOpened ? 'open' : 'closed'
    } absolute top-4 right-4 flex flex-col justify-between`}
    onClick={onClick}
  >
    <div className="burger-menu--line burger-menu--line__first" />
    <div className="burger-menu--line" />
    <div className="burger-menu--line burger-menu--line__last" />
  </button>
);

export default BurgerMenu;
