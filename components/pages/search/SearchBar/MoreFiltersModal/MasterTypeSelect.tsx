import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MasterType } from 'types/models/MasterType';
import AngleDownIcon from 'assets/images/icons/angle-double-down.svg';
import AngleUpIcon from 'assets/images/icons/angle-double-up.svg';
import { splitAt } from 'lib/helpers/array';
import theme from 'constants/theme';
import _ from 'lodash';

type MasterTypeSelectProps = {
  title?: string;
  masterTypes?: MasterType[];
  firstVisibleNumber?: number;
  value?: number[];
  onChange?: (value?: number[]) => void;
};

const iconProps = {
  className: 'mr-1',
  width: 10,
  height: 10,
  fill: theme.colors.black,
};

const MasterTypeSelect: React.FC<MasterTypeSelectProps> = ({
  title = '',
  masterTypes = [],
  firstVisibleNumber = 4,
  value = [],
  onChange = () => {},
}) => {
  const [visibleItems, hiddenItems] = splitAt(masterTypes, firstVisibleNumber);

  const renderItems = (items: MasterType[]) => (
    <>
      {_.chunk(items, 2).map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((item) => (
            <label key={item.id} className="w-1/2">
              <input
                className="mr-2"
                type="checkbox"
                value={item.id}
                checked={value.includes(item.id)}
                onChange={() => onChange(_.xor(value, [item.id]))}
              />
              {item.name}
            </label>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <div className="moreFiltersModal__section">
      <h4 className="moreFiltersModal__sectionTitle">{title}</h4>
      {renderItems(visibleItems)}
      <Disclosure>
        {({ open }) => (
          <>
            {!open && (
              <Disclosure.Button className="flex flex-row items-center hover:underline mt-1 text-sm">
                <AngleDownIcon {...iconProps} />
                Show more
              </Disclosure.Button>
            )}
            <Disclosure.Panel>{renderItems(hiddenItems)}</Disclosure.Panel>
            {open && (
              <Disclosure.Button className="flex flex-row items-center hover:underline mt-1 text-sm">
                <AngleUpIcon {...iconProps} />
                Show less
              </Disclosure.Button>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MasterTypeSelect;
