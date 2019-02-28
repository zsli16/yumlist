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

  render() {
    const list = this.props.favoritesList;
    return list.map(result => <FavoriteRestaurant restaurant={result} removeFromList={this.props.removeFromList}/>);
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
