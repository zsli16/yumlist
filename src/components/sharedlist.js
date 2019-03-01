import React, { Component } from 'react';
import { connect } from 'react-redux';

class SharedList extends Component {

  getRestaurants = (listId) => {
    fetch(`http://localhost:3001/${listId}`)
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  componentDidMount() {
    // this.getRestaurants(this.state.listId);
  }
  
}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})




export default connect(mapStateToProps)(SharedList);