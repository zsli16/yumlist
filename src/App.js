import React, { Component } from 'react';
import './App.css';
import Searchbar from './searchbar';
import FavoritesList from './favoriteslist';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Searchbar/>
        <FavoritesList/>
      </div>
    );
  };
}

export default App;
