import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToList, loadFavorites, voteForRestaurant } from '../actions.js';
import SharedRestaurant from './sharedrestaurant';
import logo from './../assets/yumlist-logo.png';

class SharedList extends Component {

  constructor(props) {
    super(props)
      this.state = {
        listId: window.location.pathname.slice('/share/'.length),
        listName: '',
        listDetails: '',
      }
    }

  getRestaurants = (listId) => {
    fetch(`http://localhost:3001/load/${listId}`)
      .then(res => res.json())
      .then(res => res.map(restaurant => {
        this.props.addToList(restaurant)
        return restaurant // return each restaurant instead of the action object
      }))
      .then(res => this.props.loadFavorites(res))
  }

  getListInfo = (listId) => {
    fetch(`http://localhost:3001/${listId}`)
      .then(res => res.json())
      .then(res => { 
        this.setState({listName: res.listname, listDetails: res.listdetails }, () => {
          this.getRestaurants(this.state.listId) 
        })})
  }

  componentDidMount() {
    const list = this.state.listId;
    this.getListInfo(list);
  }

  render() {

    const list = this.props.favoritesList;
    const items = list.map(result => <SharedRestaurant list={this.state.listId} key={result.id} restaurant={result} voteForRestaurant={this.props.voteForRestaurant}/>);

    return (
      <div className="sharedlist-wrapper">
        <img src={logo} alt="Logo" className="yumlist-logo"/>
        <div className="sharedlist-items">
        <h1>{this.state.listName}</h1>
        <h1>{this.state.listDetails}</h1>
        {items}
        </div>
      </div>
    )
  }
}
  

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  addToList: (restaurant) => dispatch(addToList(restaurant)),
  loadFavorites: (favorites) => dispatch(loadFavorites(favorites)),
  voteForRestaurant: (restaurantId) => dispatch(voteForRestaurant(restaurantId))
})




export default connect(mapStateToProps, mapDispatchToProps)(SharedList);