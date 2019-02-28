import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';

class Yumlist extends Component {

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  saveList = () => {
    console.log('save list clicked');
    const listName = 'placeholder name';
    const listDetails = 'placeholder details';
    // const listitems = this.props.favoritesList;
    fetch('http://localhost:3001/createlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "listname": listName,
        "listdetails": listDetails
      })
        // .then(res => res.json())
        // .then(res => console.log(res.id))
    });
  }
      // then retrieve the unique ID of the list that is created in the database and show to the user

  render() {
    const list = this.props.favoritesList;
    const items = list.map(result => <FavoriteRestaurant key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);

    return (
      <div className="list-wrapper">
        <div className="list-input">
          <input type="text" className="list-details" placeholder="Edit List Title" name="list-title"/>
          <input type="text" className="list-details" placeholder="Edit List Details" name="list-details"/>
        </div>
        {items}
      <button className="save-list" onClick={this.saveList}>Save List</button>
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
