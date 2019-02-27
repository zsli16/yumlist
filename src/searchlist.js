import React from 'react';
import SearchResult from './searchresult';

const SearchList = ({results}) => {
  return results.map(result => <SearchResult restaurant={result}/>);
}

export default SearchList;