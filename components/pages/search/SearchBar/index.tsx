import React from 'react';
import PlaceSearch from 'components/pages/search/SearchBar/PlaceSearch';
import DateRangePicker from 'components/pages/search/SearchBar/DateRangePicker';
import GuestsPicker from 'components/pages/search/SearchBar/GuestsPicker';
import MoreFilters from 'components/pages/search/SearchBar/MoreFilters';
import { HomePageSearchInput } from 'lib/forms/search';

type SearchBarProps = {
  filter?: HomePageSearchInput;
  onChange?: (value?: Partial<HomePageSearchInput>) => void;
  onSearch?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  filter,
  onChange = () => {},
  onSearch = () => {},
}) => (
  <div className="searchBar">
    <PlaceSearch address={filter.formattedAddress} onChange={onChange} />
    <DateRangePicker
      checkIn={filter.checkIn}
      checkOut={filter.checkOut}
      onChange={onChange}
    />
    <GuestsPicker guests={filter.guests} onChange={onChange} />
    <MoreFilters filter={filter} onChange={onChange} onSearch={onSearch} />
  </div>
);

export default SearchBar;
