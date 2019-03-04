import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToList, loadFavorites, voteForRestaurant } from '../actions.js';
import SharedRestaurant from './sharedrestaurant';
import logo from './../assets/yumlist-logo.png';
import CreateUserModal from './createuser';

class SharedList extends Component {

  constructor(props) {
    super(props)
      this.state = {
        listId: window.location.pathname.slice('/share/'.length),
        listName: '',
        listDetails: '',
        username: '',
        voted: '',
        createUserDialog: true  
      }
    }

  // get all restaurants from this particular list
  getRestaurants = (listId) => {
    fetch(`http://localhost:3001/loadshared/${listId}`)
      .then(res => res.json())
      .then(res => res.map(restaurant => {
        this.props.addToList(restaurant) // adds restaurants to favorites list
        return restaurant // return each restaurant instead of the action object
      }))
      .then(res => this.props.loadFavorites(res))
  }

  getListInfo = (listId) => {
    fetch(`http://localhost:3001/${listId}`)
      .then(res => res.json())
      .then(res => { 
        this.setState({listName: res.listname, listDetails: res.listdetails }, () => {
          // console.log('restaurants in list', res);
          this.getRestaurants(this.state.listId) 
        })})
  }

  createUser = (username) => {
    this.setState({username: username, createUserDialog: false},  () => console.log('new username is', this.state.username))
  }

  updateShared = () => {
    
    fetch(`http://localhost:3001/updateshared/${this.state.listId}`, {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: JSON.stringify({"update": "ok"})
    })
    .then(res => res.text())
    .then(res => this.getRestaurants(res))

    this.setState({createUserDialog: false});
    
    // window.location.reload();

  }

  componentDidMount() {
    const list = this.state.listId;
    this.getListInfo(list);
  }

  render() {

    const list = this.props.favoritesList;
    const items = list.map(result => <SharedRestaurant score={result.score} list={this.state.listId} key={result.id} username={this.state.username} restaurant={result} reloadScore={this.getRestaurants}/>);

    return (

      <div className="sharedlist-wrapper">

        <CreateUserModal createUser={this.createUser} show={this.state.createUserDialog} listId={this.state.listId}>
            Here's my modal
        </CreateUserModal>

        <img src={logo} alt="Logo" className="yumlist-logo"/>
        <div className="sharedlist-items">
        <h1>{this.state.listName}</h1>
        <h1>{this.state.listDetails}</h1>
        {items}
        </div>

        <button onClick={this.updateShared}>Save Yums</button>
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