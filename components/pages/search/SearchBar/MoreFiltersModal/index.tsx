import React from 'react';
import Modal, { ModalProps } from 'components/Modal';
import IconButton from 'components/Button/IconButton';
import Rooms from 'components/pages/search/SearchBar/MoreFiltersModal/Rooms';
import MasterTypeSelect from 'components/pages/search/SearchBar/MoreFiltersModal/MasterTypeSelect';
import { getAmenitiesByCategoryId } from 'lib/helpers/master-type';
import PropertyTypes from 'static/property-type.json';
import AmenityCategories from 'static/amenity-category.json';
import { HomePageSearchInput } from 'lib/forms/search';

type MoreFiltersModalProps = {
  filter: Partial<HomePageSearchInput>;
  onChange: (value: Partial<HomePageSearchInput>) => void;
  onSearch: () => void;
} & ModalProps;

const MoreFiltersModal: React.FC<MoreFiltersModalProps> = ({
  open,
  onClose,
  filter,
  onChange,
  onSearch,
}) => {
  const { propertyTypesIds, amenitiesIds } = filter;

  return (
    <Modal open={open} onClose={onClose} containerClass="sm:max-w-3xl">
      <div className="moreFiltersModal">
        <div className="moreFiltersModal__header">
          <h3 className="moreFiltersModal__title">Filters</h3>
          <IconButton iconName="close" onClick={onClose} />
        </div>
        <div className="moreFiltersModal__body">
          <Rooms
            bedroomsCount={filter.bedroomsCount}
            bathroomsCount={filter.bathroomsCount}
            bedsCount={filter.bedsCount}
            onChange={(value, key) => onChange({ [key]: value })}
          />
          <MasterTypeSelect
            title="Property Type"
            masterTypes={PropertyTypes}
            value={propertyTypesIds}
            onChange={(value) => onChange({ amenitiesIds: value })}
          />
          {AmenityCategories.map((category) => (
            <MasterTypeSelect
              key={category.id}
              title={category.name}
              masterTypes={getAmenitiesByCategoryId(category.id)}
              value={amenitiesIds}
              onChange={(value) => onChange({ amenitiesIds: value })}
            />
          ))}
        </div>
        <div className="moreFiltersModal__footer">
          <button
            type="button"
            className="btn btn-dark mr-2"
            onClick={() =>
              onChange({
                bedsCount: undefined,
                bedroomsCount: undefined,
                bathroomsCount: undefined,
                propertyTypesIds: [],
                amenitiesIds: [],
              })
            }
          >
            Clear all
          </button>
          <button type="button" className="btn btn-primary" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MoreFiltersModal;
