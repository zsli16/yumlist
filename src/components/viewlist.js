import React, { Component } from 'react';
import { loadFavorites, addMultipleToList } from '../actions.js';
import { connect } from 'react-redux';
import SharedRestaurant from './sharedrestaurant';
import logo from './../assets/yumlist-logo.png';


class ViewList extends Component {
  state = {
    listId: window.location.pathname.slice('/view/'.length),
    listName: '',
    listDetails: '',
    url: `http://${process.env.REACT_APP_LOCAL_URL}:3001`
  }

  componentDidMount() {
    this.getListInfo(this.state.listId);
    this.getRestaurants(this.state.listId);
  }

  getListInfo = (listId) => {
    fetch(`${this.state.url}/${listId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({listName: res.listname, listDetails: res.listdetails})
      })
  }

  getRestaurants = (listId) => {
    fetch(`${this.state.url}/load/${listId}`)
      .then(res => res.json())
      .then(res => {
        this.props.addMultipleToList(res) // adds all restaurants to favoritesList in redux
        return res
      })
      .then(res => this.props.loadFavorites(res)) // loads all restaurants but apparently not necessary
  }

  render() {
    const list = this.props.favoritesList;

    list.sort((a,b) => {
      if (b.score < a.score) {
        return -1;
      }
      if (b.score > a.score) {
        return 1;
      }
      return 0;
    });

    const items = list.map(result => <SharedRestaurant view={true} restaurant={result} score={result.score} key={result.id + this.state.listId}/>);
    return(
      <div className="sharedlist-wrapper">
        <img src={logo} alt="Logo" className="yumlist-logo" onClick={this.returnHome}/>
        <div className="sharedlist-items">
        <h1>{this.state.listName}</h1>
        <h2>A List Made By {this.state.listDetails}</h2>
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
  loadFavorites: (favorites) => dispatch(loadFavorites(favorites)),
  addMultipleToList: (restaurants) => dispatch(addMultipleToList(restaurants)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewList);