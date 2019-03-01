import React, { Component } from 'react';
import uuid from 'uuid';
import { Router, Route, Switch } from 'react-router';

class CreateList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      listDescription: '',
      listId: uuid.v4(),
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
        "listId": this.state.listId,
      })
    })
     // then redirect or render to the searchbar component <Yumlist id={this.state.listId}>
  }

  render() {
    return (
      <div className="list-wrapper">
        <div className="list-input">
          <input type="text" className="list-details" placeholder="Edit List Title" name="list-title" value={this.state.listTitle} onChange={evt => this.updateTitle(evt)}/>
          <input type="text" className="list-details" placeholder="Edit List Details" name="list-details" value={this.state.listDescription} onChange={evt => this.updateDescription(evt)}/>
        </div>
      <button className="save-list" onClick={this.saveList}>Create List</button>
      </div>
    )

  }

  

}


export default CreateList;