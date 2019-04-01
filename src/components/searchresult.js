import React from 'react';
import { addToList, updateSearchResults } from '../actions.js';
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

    //REVIEW! USO DE PROPS VS THIS.PROPS
    const list = window.location.pathname.slice('/list/'.length);
    const url = `http://${process.env.REACT_APP_LOCAL_URL}:3001`;

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
      .then(props.updateSearchResults([]))
      .catch(err => console.log(err));
  }

  const isFavorite = props.favoritesList.find((r) => r.id === restaurant.id) !== undefined;

  return (
    <div className="search-result" id={restaurant.id}>
      <img src={restaurant.image_url} className="restaurant-icon" alt="restaurant-icon"/>
      <div className="search-title">{restaurant.name}</div>
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
  updateSearchResults: (results) => dispatch(updateSearchResults(results))
})

const ConnectedSearchresult = connect(mapStateToProps, mapDispatchToProps)(Searchresult);
export { ConnectedSearchresult, Searchresult };
