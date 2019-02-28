import React, { Component } from 'react';
import { addToList } from '../actions.js';
import { connect } from 'react-redux';

const addRestaurant = (restaurant) => {
  // const selected = e.currentTarget.parentNode;

  const selectedRestaurant = {
    uid: restaurant.id,
    name: restaurant.name,
    image_url: restaurant.image_url,
    rating: restaurant.rating,
    price: restaurant.price,
    url: restaurant.url,
    review_count: restaurant.review_count
  }

  fetch('http://localhost:3001/addtofavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedRestaurant),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      // this.props.addtoList(res);
    });
}

const Searchresult = ({restaurant}) => {
  return (
    <div className="search-result" id={restaurant.id}>
      <img src={restaurant.image_url} className="restaurant-icon" alt="restaurant-icon"/>
      <div className="restaurant-title">{restaurant.name}</div>
      <button className="addResult" onClick={() => addRestaurant(restaurant)}>Add</button>
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