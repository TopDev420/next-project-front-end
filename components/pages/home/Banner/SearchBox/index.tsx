import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { HomePageSearchInput } from 'lib/forms/search';
import DateRangePicker from 'components/pages/home/Banner/SearchBox/DateRangePicker';
import GuestsPicker from 'components/pages/home/Banner/SearchBox/GuestsPicker';
import PlaceSearch from 'components/pages/home/Banner/SearchBox/PlaceSearch';
import Search from 'components/pages/home/Banner/SearchBox/Search';
import { convertSearchInputToQuery } from 'lib/transformers/search';

const SearchBox = () => {
  const router = useRouter();
  const [input, setInput] = useState<HomePageSearchInput>({});

  const onPlaceChange: React.ComponentProps<typeof PlaceSearch>['onChange'] =
    useCallback((newInput) => {
      if (!newInput || !newInput.formattedAddress || !newInput.lat) {
        setInput(({ guests, checkIn, checkOut }) => ({
          guests,
          checkIn,
          checkOut,
        }));
      }
      setInput((oldInput) => ({ ...oldInput, ...newInput }));
    }, []);

  const onDateChange: React.ComponentProps<typeof DateRangePicker>['onChange'] =
    useCallback((checkIn, checkOut) => {
      setInput((oldInput) => ({ ...oldInput, checkIn, checkOut }));
    }, []);

  const onGuestsChange = useCallback(
    (guests) => setInput((oldInput) => ({ ...oldInput, guests })),
    [],
  );

  const handleSearch = useCallback(() => {
    if (!input) {
      return;
    }
    router.push({
      pathname: '/search',
      query: convertSearchInputToQuery(input) as any,
    });
  }, [input, router]);

  return (
    <div className="searchBox">
      <PlaceSearch onChange={onPlaceChange} />
      <DateRangePicker onChange={onDateChange} />
      <GuestsPicker onChange={onGuestsChange} />
      <Search onClick={handleSearch} />
    </div>
  );
};

export default SearchBox;
