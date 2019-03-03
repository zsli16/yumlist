import React, { Component } from 'react';
import uuid from 'uuid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Yumlist from './yumlist';
import Searchbar from './searchbar';
import logo from './../assets/yumlist-logo.png';
import write from './../assets/write.png';
import profile from './../assets/profile.png';

class CreateList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      listDescription: '',
      listId: uuid.v4(), // refactor this to generate UUID from server rather than client
    };
  }

  updateTitle(evt) {
    this.setState({
      listTitle: evt.target.value
    });
  }

  updateDescription(evt) {
    this.setState({
      listDescription: evt.target.value
    });
  }

  saveList = () => {
    const listName = this.state.listTitle;
    const listDetails = this.state.listDescription;
    
    fetch('http://localhost:3001/createlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "listname": listName,
        "listdetails": listDetails,
        "listId": this.state.listId, // refactor this to generate UUID from server rather than client
      })
    })
    .then(res => res.json())
    .then(res => { //refactor to get the id from the database
      this.setState({listId: res.id}, () => {
        this.props.history.push(`/list/${this.state.listId}`);
      });
    })
  }


  render() {
    return (
      <Router>
        <div class="create-list">
          <img src={logo} alt="Logo" className="yumlist-logo"/>
          <div className="create-list-wrapper">
            <h2>Create New List</h2>
            <div className="list-input">
              <input type="text" autoComplete="off" className="list-details" placeholder="Edit List Title" name="list-title" value={this.state.listTitle} onChange={evt => this.updateTitle(evt)}/>
              <input type="text" autoComplete="off" className="list-details" placeholder="Edit List Details" name="list-details" value={this.state.listDescription} onChange={evt => this.updateDescription(evt)}/>
            </div>

            <button className="save-list" onClick={this.saveList}>Save List</button>
    
            <Route exact path='/list/:listId' component={Yumlist}/>
            <Route exact path='/list/:listId' component={Searchbar}/>  
            {/* <Route exact path='/list/:listId' render={ (props) => <Yumlist {...props} /> }/>  */}
          </div>
        </div>

      </Router>
    )

 

  }

  

}


export default CreateList;