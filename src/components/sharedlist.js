import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFavorites, voteForRestaurant, addMultipleToList } from '../actions.js';
import SharedRestaurant from './sharedrestaurant';
import logo from './../assets/yumlist-logo.png';
import CreateUserModal from './createuser';
import VotesSubmitted from './votessubmitted';
import {withRouter} from 'react-router-dom';

class SharedList extends Component {

  constructor(props) {
    super(props)
      this.state = {
        listId: window.location.pathname.slice('/share/'.length),
        listName: '',
        listDetails: '',
        username: '',
        voted: '',
        createUserDialog: true,
        votesSubmitted: false, // to open a dialog to confirm sharing
        url: 'http://sues-macbook-pro.local:3001'
      }
    }
  
    componentDidMount() {
      const list = this.state.listId;
      this.getListInfo(list);
    }

  // get all restaurants from this particular list
  getRestaurants = (listId) => {

    fetch(`${this.state.url}/loadshared/${listId}`)
      .then(res => res.json())
      .then(res => {
        this.props.addMultipleToList(res) // adds all restaurants to favoritesList in redux
        return res
      })
      .then(res => this.props.loadFavorites(res)) // loads all restaurants but apparently not necessary
  }

  getListInfo = (listId) => {

    fetch(`${this.state.url}/${listId}`)
      .then(res => res.json())
      .then(res => { 
        this.setState({listName: res.listname, listDetails: res.listdetails }, () => {
          // console.log('restaurants in list', res);
          this.getRestaurants(this.state.listId) 
        })})
  }

  createUser = (username) => {
    this.setState({username: username, createUserDialog: false},  () => console.log('user created'))
  }

  updateShared = () => {
    this.setState({createUserDialog: false, votesSubmitted: true}, () => console.log('updated votes!'));
    fetch(`${this.state.url}/updateshared/${this.state.listId}`, {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: JSON.stringify({"update": "ok"})
    })
    .then(res => res.text())
    .then(res => this.getRestaurants(res))
  }

  closeDialog = () => {
    this.setState({votesSubmitted: false}, () => console.log('closed dialog'))
  }


  render() {

    const list = this.props.favoritesList;
    const items = list.map(result => <SharedRestaurant score={result.score} list={this.state.listId} key={result.id + this.state.listId} username={this.state.username} restaurant={result} reloadScore={this.getRestaurants}/>);

    return (

      <div className="sharedlist-wrapper">
        
        <VotesSubmitted show={this.state.votesSubmitted} onClose={this.closeDialog}/>

        <CreateUserModal createUser={this.createUser} show={this.state.createUserDialog} listId={this.state.listId} listDetails={this.state.listDetails} listName={this.state.listName}/>

        <img src={logo} alt="Logo" className="yumlist-logo"/>
        <div className="sharedlist-items">
        <h1>{this.state.listName}</h1>
        <h2>A List Made By {this.state.listDetails}</h2>
        {items}
        <button onClick={this.updateShared} className="go-there">Save Yums</button>
        </div>

      </div>
    )
  }
}
  

const mapStateToProps = (state) => ({
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  addMultipleToList: (restaurants) => dispatch(addMultipleToList(restaurants)),
  loadFavorites: (favorites) => dispatch(loadFavorites(favorites)),
  voteForRestaurant: (restaurantId) => dispatch(voteForRestaurant(restaurantId))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SharedList));