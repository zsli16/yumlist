import React from 'react';
import { ConnectedSearchresult } from './searchresult';

const SearchList = ({results}) => {
  if (results) {
    return results.map((result, index) => <ConnectedSearchresult key={index} restaurant={result}/>);
  } else {
    return <p>Uh oh... Something went wrong...</p>
  }
}

export default SearchList;