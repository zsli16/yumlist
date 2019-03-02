import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';
import { BrowserRouter as Router, Link } from "react-router-dom";
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

  getListInfo = (listId) => {
    fetch(`http://localhost:3001/${listId}`)
      .then(res => res.json())
      .then(res => { 
        this.setState({listName: res.listname, listDetails: res.listdetails }, () => {
          this.loadRestaurantsfromList(this.state.listId) //remember you need to pass a callback to this.setState
        })})
  }

  loadRestaurantsfromList = (listId) => {
    fetch(`http://localhost:3001/load/${listId}/`)
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  componentDidMount() {
    this.getListInfo(this.state.listId);
  }

  shareList = () => {
    this.setState({openDialog: !this.state.openDialog});
    // this.props.history.push('/share')
  }

  render() {

    const list = this.props.favoritesList;
    const items = list.map(result => <FavoriteRestaurant list={this.state.listId} key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);

    return (
      <div className="list-wrapper">
        <Searchbar/>

      <Modal show={this.state.openDialog} onClose={this.shareList} listId={this.state.listId}>
        Here's my modal
      </Modal>

        <div className="list-input">
          <h1>{this.state.listName}</h1>
          <h2>{this.state.listDetails}</h2>
        </div>
        {items}
          <button className="save-list" onClick={this.shareList}>Share List</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Yumlist);
