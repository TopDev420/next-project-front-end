import React from 'react';

const Search: React.FC<{ onClick?: () => void }> = ({ onClick = () => {} }) => (
  <div className="searchBox__item flex-initial pl-4 pr-6 justify-center">
    <button type="button" className="searchBox__search" onClick={onClick}>
      Search
    </button>
  </div>
);

export default Search;
