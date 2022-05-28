import { Disclosure } from '@headlessui/react';
import ArrowDownIcon from 'assets/images/icons/angle-double-down.svg';
import theme from 'constants/theme';

const AccordionItem: React.FC<{
  title: string;
}> = ({ title, children }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button
          as="div"
          className="p-2 border-b flex flex-row justify-between items-center cursor-pointer"
        >
          <h3 style={{ fontSize: theme.fontSize.base[0] }}>{title}</h3>
          <ArrowDownIcon
            height={14}
            width={14}
            fill={theme?.colors?.blue[900]}
            className={open ? 'transform rotate-180' : ''}
          />
        </Disclosure.Button>
        <div className={open ? 'block' : 'hidden'}>{children}</div>
      </>
    )}
  </Disclosure>
);

export default AccordionItem;
