import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';
import Modal from './modal'
import { ConnectedSearchbar } from './searchbar.js';

class Yumlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      listId: this.props.match.params.id, // this is working!
      listName: '',
      listDetails: '',
      listLocation: '',
      url: `http://${process.env.REACT_APP_LOCAL_URL}:3001`
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  getListInfo = (listId) => { //runs on componentDidMount

    fetch(`${this.state.url}/${listId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({listName: res.listname, listDetails: res.listdetails, listLocation: res.listlocation }, () => {
          this.loadRestaurantsfromList(this.state.listId) //remember you need to pass a callback to this.setState
        })})
  }

  loadRestaurantsfromList = (listId) => { // goes to ctrl.loadFavoritesFromListWithScore

    fetch(`${this.state.url}/load/${listId}/`)
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  handleClickOutside(event) {
    if (event.target.classList.contains('backdrop')) {
      this.shareList();
    }
  }

  componentDidMount() {
    this.getListInfo(this.state.listId);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  shareList = () => {
    this.setState({openDialog: !this.state.openDialog}, () => console.log('toggled modal'));
  }

  render() {
    let cta;
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

    const items = list.map(result => <FavoriteRestaurant rating={this.renderRating} score={this.score} list={this.state.listId} key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);

    if (items.length) {
      cta = <button className="share-list" onClick={() => this.shareList()}>Share List</button>
    } else {
      cta = <h2>Go ahead and add some restaurants to your list!</h2>
    }

    return (

        <div className="yumlist-body-wrapper">

          <ConnectedSearchbar history={this.props.history} location={this.state.listLocation}/>

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

const ConnectedYumlist = connect(mapStateToProps, mapDispatchToProps)(Yumlist);
export { ConnectedYumlist, Yumlist };