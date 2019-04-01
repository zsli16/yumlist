import React, { Component } from 'react';
import './App.css';
import CreateList from './components/createlist';
import { ConnectedYumlist } from './components/yumlist';
import { ConnectedSharedList } from './components/sharedlist';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/create' component={CreateList}/>
          <Route path='/list/:id' component={ConnectedYumlist} />
          <Route path='/share/:id' component={ConnectedSharedList}/>
          <Redirect to='/create'/>
        </Switch>
      </Router>
    )
  }
}

export default App;
