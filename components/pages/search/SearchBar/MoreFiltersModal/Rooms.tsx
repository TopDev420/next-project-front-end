/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Counter from 'components/pages/search/SearchBar/MoreFiltersModal/Counter';

type RoomsProps = {
  bedsCount?: number;
  bedroomsCount?: number;
  bathroomsCount?: number;
  onChange?: (
    value: number,
    type: 'bedsCount' | 'bedroomsCount' | 'bathroomsCount',
  ) => void;
};

const Rooms: React.FC<RoomsProps> = ({
  bedsCount = 0,
  bedroomsCount = 0,
  bathroomsCount = 0,
  onChange,
}) => (
  <div className="moreFiltersModal__section">
    <h4 className="moreFiltersModal__sectionTitle">Bedrooms and Bathrooms</h4>
    <div className="flex flex-row justify-between items-center mb-4">
      <label>Beds</label>
      <Counter
        value={bedsCount}
        onChange={(value) => onChange(value, 'bedsCount')}
      />
    </div>
    <div className="flex flex-row justify-between items-center mb-4">
      <label>Bedrooms</label>
      <Counter
        value={bedroomsCount}
        onChange={(value) => onChange(value, 'bedroomsCount')}
      />
    </div>
    <div className="flex flex-row justify-between items-center">
      <label>Bathrooms</label>
      <Counter
        value={bathroomsCount}
        onChange={(value) => onChange(value, 'bathroomsCount')}
      />
    </div>
  </div>
);

export default Rooms;
