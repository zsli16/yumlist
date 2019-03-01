import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import Yumlist from './components/yumlist';
import CreateList from './components/createlist';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Searchbar/>
        {/* <CreateList/> */}
        <Yumlist/>
      </div>
    );
  };
}

export default App;
