/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { NavItem } from 'types/NavItem';

const Leaf: React.FC<{
  item: NavItem;
  className?: string;
  additionalClass?: string;
}> = ({
  item,
  className = 'flex w-full h-full items-center',
  additionalClass = '',
}) => {
  const dispatch = useDispatch();
  const containerClass = `${className} ${additionalClass}`;
  return (
    <>
      {item.url ? (
        <Link href={item.url} passHref>
          <a className={containerClass}>{item.title}</a>
        </Link>
      ) : (
        <>
          {!!item.action ? (
            <a
              className={containerClass}
              role="button"
              onClick={() => dispatch(item.action)}
            >
              {item.title}
            </a>
          ) : (
            <span className={containerClass}>{item.title}</span>
          )}
        </>
      )}
    </>
  );
};

export default Leaf;
