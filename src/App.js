import React, { Component } from 'react';
import './App.css';
import CreateList from './components/createlist';
import ViewList from './components/viewlist';
import Home from './components/home';
import { ConnectedYumlist } from './components/yumlist';
import { ConnectedSharedList } from './components/sharedlist';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/list' component={CreateList}/>
          <Route path='/home' component={Home}/>
          <Route exact path='/list/:id' component={ConnectedYumlist} />
          <Route path='/share/:id' component={ConnectedSharedList}/>
          <Route path='/view/:id' component={ViewList}/>
          <Redirect to='/home'/>
        </Switch>
      </Router>
    )
  }
}

export default App;
