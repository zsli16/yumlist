import React, { Component } from 'react';
import logo from './../assets/yumlist-logo.png';
import btoa from 'btoa';

class CreateList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      listDescription: '',
      listLocation: '',
      sendEnable: false,
      errorMessage: '',
      url: `${process.env.REACT_APP_SERVER}`
      // url: 'https://yumlist.herokuapp.com'
    };
  }

  updateSendEnable = () => {
    if (this.state.listTitle && this.state.listDescription && this.state.listLocation) {
      this.setState({
        sendEnable: true
      });
    } else {
      this.setState({
        sendEnable: false
      });
    }
  }

  updateTitle = async (evt) => {
    await this.setState({
      listTitle: evt.target.value
    }, this.updateSendEnable);
  }

  updateDescription = async (evt) => {
    await this.setState({
      listDescription: evt.target.value
    }, this.updateSendEnable);
  }

  updateLocation = async (evt) => {
    await this.setState({
      listLocation: evt.target.value
    }, this.updateSendEnable);
  }

  saveList = () => {
    const listName = this.state.listTitle;
    const listDetails = this.state.listDescription;
    const listLocation = this.state.listLocation;
    const listId = btoa(listName + listDetails + listLocation);

    fetch(`${this.state.url}/createlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "listname": listName,
        "listdetails": listDetails,
        "listlocation": listLocation,
        "listId": listId, 
      })
    })
    .then(res => res.json())
    .then(res => { 
      if (res.error) {
        this.setState({errorMessage: res.error})
      } else {
        this.props.history.push(`/list/${listId}`);
      }
    })
  }

  findList = () => {
    const listId = btoa(this.state.listTitle + this.state.listDescription + this.state.listLocation);
    fetch(`${this.state.url}/${listId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.id) {
        this.props.history.push(`/list/${res.id}`);
      } else {
        this.setState({errorMessage: res.error})
      }
    })
  }


  render() {
    let button;
    if (!this.props.location.state) {
      button = <button className="save-list" disabled={!this.state.sendEnable} onClick={this.saveList}>Save List</button>
    } else {
      button = <button className="save-list" disabled={!this.state.sendEnable} onClick={this.findList}>Find Yumlist</button>
    }

    return (
        <div className="create-list">
          <img src={logo} alt="Logo" className="yumlist-logo"/>
          <div className="create-list-wrapper">
            <h2>{!this.props.location.state ? 'Create New List' : 'Find My List'}</h2>
            <div className="list-input">
              <input type="text" autoComplete="off" className="list-details" placeholder="List Name" name="list-title" value={this.state.listTitle} onChange={this.updateTitle}/>
              <input type="text" autoComplete="off" className="list-details" placeholder="Your Name" name="list-details" value={this.state.listDescription} onChange={this.updateDescription}/>
                            
              <select className="list-details" value={this.state.listLocation} onChange={this.updateLocation}>
                <option value="">Choose a city</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Berlin">Berlin</option>
                <option value="London">London</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
                <option value="Paris">Paris</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Singapore">Singapore</option>
                <option value="Sydney">Sydney</option>
              </select>

            </div>
            {button}
            <div>
              <br></br>
            {this.state.errorMessage}
            </div>
          </div>
        </div>
    )
  }
}


export default CreateList;