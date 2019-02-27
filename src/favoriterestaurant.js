import React, { Component } from 'react';
import { removeFromList } from './actions.js';
import { connect } from 'react-redux';

class FavoriteRestaurant extends Component {
  
  removeRestaurant = (e) => {
    const restaurantId = e.currentTarget.parentNode.id;
    this.props.removeFromList(restaurantId);
  }

  render() {
    return (
      <div className="favorite-restaurant">
        <img className="favorite-icon" alt="favorite-restaurant"/>
        <div className="favorite-title">Favorite Restaurant Title</div>
        <button className="deleteResult" onClick={(e) => this.removeRestaurant(e)}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  removeFromList: (restaurant) => dispatch(removeFromList(restaurant)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRestaurant);