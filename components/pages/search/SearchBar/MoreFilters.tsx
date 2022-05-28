import React, { useState } from 'react';
import theme from 'constants/theme';
import TuneIcon from 'assets/images/icons/tune.svg';
import MoreFiltersModal from 'components/pages/search/SearchBar/MoreFiltersModal';
import { HomePageSearchInput } from 'lib/forms/search';

type MoreFiltersProps = {
  filter?: Partial<HomePageSearchInput>;
  onChange?: (filter: Partial<HomePageSearchInput>) => void;
  onSearch?: () => void;
};

const MoreFilters: React.FC<MoreFiltersProps> = ({
  filter,
  onChange,
  onSearch,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="searchBar__moreFilters">
      <button
        type="button"
        className="btn btn-primary flex flex-row items-center"
        onClick={() => setModalOpen(true)}
      >
        <TuneIcon
          className="mr-2"
          width={14}
          height={14}
          fill={theme.colors?.white}
        />
        More Filters
      </button>
      <MoreFiltersModal
        filter={filter}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSearch={() => {
          setModalOpen(false);
          onSearch();
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default MoreFilters;
