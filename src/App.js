import React, { Component } from 'react';
import './App.css';
import Yumlist from './components/yumlist';
import CreateList from './components/createlist';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/create" component={CreateList}/>
          <Route path='/list/:id' component={Yumlist} />
          <Redirect to='/create'/>
        </Switch>
      </Router>
    ) 
  }
}

export default App;
