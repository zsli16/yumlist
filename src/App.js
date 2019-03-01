import React, { Component } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import Yumlist from './components/yumlist';
import CreateList from './components/createlist';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/list" component={Searchbar}/>
          <Route path="/create" component={CreateList}/>
          <Route path='/list' component={Yumlist} />
        </div>
      </Router>
    );
  };
}

export default App;
