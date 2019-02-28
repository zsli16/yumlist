import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';
import Modal from './modal';

class Yumlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      listDescription: '',
      listId: '',
      showModal: false
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

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  saveList = () => {
    const listitems = this.props.favoritesList;

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
        "restaurantsinlist": listitems
      })
    })
      .then(res => res.text())
      .then(res => this.shareList(res))
  }

  shareList = (res) => {
    console.log('shared list clicked', res);
    const container = document.querySelector('App');
    return (
      <Modal listId={res}/>
    )
  } 

    
  render() {
    const list = this.props.favoritesList;
    const items = list.map(result => <FavoriteRestaurant key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);

    return (
      <div className="list-wrapper">
        <div className="list-input">
          <input type="text" className="list-details" placeholder="Edit List Title" name="list-title" value={this.state.listTitle} onChange={evt => this.updateTitle(evt)}/>
          <input type="text" className="list-details" placeholder="Edit List Details" name="list-details" value={this.state.listDescription} onChange={evt => this.updateDescription(evt)}/>
        </div>
        {items}
      <button className="save-list" onClick={this.saveList}>Create New List</button>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  removeFromList: (restaurant) => dispatch(removeFromList(restaurant)),
  loadFavorites: (favorites) => dispatch(loadFavorites(favorites))
})


export default connect(mapStateToProps, mapDispatchToProps)(Yumlist);
