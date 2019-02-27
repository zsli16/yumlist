import React from 'react';
import { addToList } from './actions.js';
import { connect } from 'react-redux';

const Searchresult = ({restaurant}) => {
  console.log(restaurant);
  return (
    <div className="search-result">
      <div className="restaurant-title">{restaurant.name}</div>
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