import React from 'react';
import { addToList } from '../actions.js';
import { connect } from 'react-redux';

const Searchresult = ({restaurant, ...props}) => {

  const addRestaurant = (restaurant) => {

    const selectedRestaurant = {
      id: restaurant.id,
      name: restaurant.name,
      image_url: restaurant.image_url,
      rating: restaurant.rating,
      price: restaurant.price,
      url: restaurant.url,
      review_count: restaurant.review_count,
    }

    const list = window.location.pathname.slice('/list/'.length);
    const url = 'http://sues-macbook-pro.local:3001';

    fetch(`${url}/addtofavorites/${list}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedRestaurant),
    })
      .then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Already added to list')
      })
      .then(res => {
        props.addToList(res);  
      })
      // .then() close the searchlist
      .catch(err => console.log(err));
  }

  const isFavorite = props.favoritesList.find((r) => r.id === restaurant.id) !== undefined;

  return (
    <div className="search-result" id={restaurant.id}>
      <img src={restaurant.image_url} className="restaurant-icon" alt="restaurant-icon"/>
      <div className="restaurant-title">{restaurant.name}</div>
      <button className="addResult" onClick={() => addRestaurant(restaurant)} disabled={isFavorite}>Add</button>
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
