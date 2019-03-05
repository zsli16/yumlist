import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';
import { Link, withRouter } from "react-router-dom";
import Modal from './modal'
import Searchbar from './searchbar.js';

class Yumlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      listId: this.props.match.params.id, // this is working!
      listName: '',
      listDetails: ''
    };
  }

  getListInfo = (listId) => { //runs on componentDidMount
    const url = 'http://sues-macbook-pro.local:3001';

    fetch(`${url}/${listId}`)
      .then(res => res.json())
      .then(res => { 
        this.setState({listName: res.listname, listDetails: res.listdetails }, () => {
          this.loadRestaurantsfromList(this.state.listId) //remember you need to pass a callback to this.setState
        })})
  }

  loadRestaurantsfromList = (listId) => { // goes to ctrl.loadFavoritesFromList
    const url = 'http://sues-macbook-pro.local:3001';

    console.log('fetching restaurants saved to list');
    fetch(`${url}/load/${listId}/`)
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  componentDidMount() {
    this.getListInfo(this.state.listId);
  }

  shareList = () => {
    this.setState({openDialog: !this.state.openDialog}, () => console.log('toggled modal'));
  }

  render() {
    let cta;
    const list = this.props.favoritesList;
    const items = list.map(result => <FavoriteRestaurant list={this.state.listId} key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);
    
    if (items.length) {
      cta = <button className="share-list" onClick={this.shareList}>Share List</button>
    } else {
      cta = <h1>Go ahead and add some restaurants to your list!</h1>
    }

    return (
    
        <div className="yumlist-body-wrapper">
          
          <Searchbar/>

          <Modal show={this.state.openDialog} onClose={this.shareList} listId={this.state.listId}/>

          <div className="yumlist-wrapper">

            <div className="yumlist-items">
              <h1>{this.state.listName} </h1>
              <h2>A List Created By {this.state.listDetails}</h2>
              {items}
              {cta}
            </div>

          </div>
        </div>

    )
  }
  
}

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  removeFromList: (restaurant) => dispatch(removeFromList(restaurant)),
  loadFavorites: (favorites) => dispatch(loadFavorites(favorites))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Yumlist));
