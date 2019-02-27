import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';

class Yumlist extends Component {
  
  render() {
    const list = this.props.favoritesList;
    return list.map(result => <FavoriteRestaurant restaurant={result}/>);
  }

}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})


export default connect(mapStateToProps)(Yumlist);