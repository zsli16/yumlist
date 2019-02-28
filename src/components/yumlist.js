import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList } from '../actions.js';

class Yumlist extends Component {

  
  
  render() {
    const list = this.props.favoritesList;
    return list.map(result => <FavoriteRestaurant restaurant={result} removeFromList={this.props.removeFromList}/>);
  }

}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  removeFromList: (restaurant) => dispatch(removeFromList(restaurant))
})


export default connect(mapStateToProps, mapDispatchToProps)(Yumlist);