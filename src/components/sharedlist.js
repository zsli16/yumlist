import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFavorites, voteForRestaurant, addMultipleToList } from '../actions.js';
import SharedRestaurant from './sharedrestaurant';
import logo from './../assets/yumlist-logo.png';
import CreateUserModal from './createuser';
import VotesSubmitted from './votessubmitted';

class SharedList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listId: window.location.pathname.slice('/share/'.length),
      listName: '',
      listDetails: '',
      listLocation: '',
      username: '',
      voted: '',
      createUserDialog: true,
      votesSubmitted: false, // to open a dialog to confirm sharing
      url: `http://${process.env.REACT_APP_LOCAL_URL}:3001`
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const list = this.state.listId;
    this.getListInfo(list);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    let checkButton = event.target.children[0] ? event.target.children[0].children[0] : null;
    if (checkButton && event.target.classList.contains('backdrop') && checkButton.localName==='img') {
      this.closeDialog();
    }
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
        this.setState({listName: res.listname, listDetails: res.listdetails, listLocation: res.listlocation }, () => {
          this.getRestaurants(this.state.listId)
        })})
  }

  returnHome = () => {
    this.props.history.push('/create');
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
    list.sort((a,b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const items = list.map(result => <SharedRestaurant score={result.score} list={this.state.listId} key={result.id + this.state.listId} username={this.state.username} restaurant={result} reloadScore={this.getRestaurants}/>);

    return (

      <div className="sharedlist-wrapper">

        <VotesSubmitted show={this.state.votesSubmitted} onClose={this.closeDialog}/>

        <CreateUserModal createUser={this.createUser} show={this.state.createUserDialog} listId={this.state.listId} listDetails={this.state.listDetails} listName={this.state.listName} listLocation={this.state.listLocation}/>

        <img src={logo} alt="Logo" className="yumlist-logo" onClick={this.returnHome}/>
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

const ConnectedSharedList = connect(mapStateToProps, mapDispatchToProps)(SharedList);
export { ConnectedSharedList, SharedList };
