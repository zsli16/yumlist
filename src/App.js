import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import Yumlist from './components/yumlist';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Searchbar/>
        <Yumlist/>
      </div>
    );
  };
}

export default App;
