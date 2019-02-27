import React from 'react';
import { addToList } from '../actions.js';
import { connect } from 'react-redux';

const addRestaurant = (e) => {
  const restaurantId = e.currentTarget.parentNode.id;
  const restaurant = {
    id: restaurantId
  }

  // make call to endpoint with ID, add the result to the state
  fetch('http://localhost:3001/addtofavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restaurant),
  })
    .then(res => res.json())
    .then(res => {
      this.props.addtoList(restaurant);
    });
}


const Searchresult = ({restaurant}) => {
  return (
    <div className="search-result" id={restaurant.id}>
      <img src={restaurant.image_url} className="restaurant-icon" alt="restaurant-icon"/>
      <div className="restaurant-title">{restaurant.name}</div>
      <button className="addResult" onClick={(e) => addRestaurant(e)}>Add</button>
    </div>

  )
}

const mapStateToProps = (state) => ({
  searchList: state.searchList,
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  addToList: (restaurant) => dispatch(addToList(restaurant)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Searchresult);