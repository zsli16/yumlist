import React from 'react';
import { ConnectedSearchresult } from './searchresult';

const SearchList = ({results}) => {

  return results.map((result, index) => <ConnectedSearchresult key={index} restaurant={result}/>);
}

export default SearchList;