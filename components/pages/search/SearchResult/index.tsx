import React from 'react';
import MdSearchResult from 'components/pages/search/SearchResult/MdSearchResult';
import SmSearchResult from 'components/pages/search/SearchResult/SmSearchResult';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import { SearchResultProps } from 'components/pages/search/SearchResult/types';

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SmSearchResult {...props} />;
  }

  return <MdSearchResult {...props} />;
};

export default SearchResult;
