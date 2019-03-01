import React, { Component } from 'react';
import FavoriteRestaurant from './favoriterestaurant.js';
import { connect } from 'react-redux';
import { removeFromList, loadFavorites } from '../actions.js';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
// import uuid from 'uuid';
// import SharedList from './sharedlist.js';
import Modal from './modal'

class Yumlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listTitle: '',
      listDescription: '',
      listId: 'yumlist', //by default make the first list one
      openDialog: false
    };
  }

  updateTitle(evt) {
    this.setState({
      listTitle: evt.target.value
    });
  }

  updateDescription(evt) {
    this.setState({
      listDescription: evt.target.value
    });
  }

  getRestaurants = (listId) => {
    fetch(`http://localhost:3001/${listId}`)
      .then(res => res.json())
      .then(res => this.props.loadFavorites(res))
  }

  componentDidMount() {
    this.getRestaurants(this.state.listId);
  }

  // saveList = () => {
  //   const listitems = this.props.favoritesList;
  //   const listName = this.state.listTitle;
  //   const listDetails = this.state.listDescription;
    
  //   fetch('http://localhost:3001/createlist', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "listname": listName,
  //       "listdetails": listDetails,
  //       "listId": this.state.listId,
  //       "restaurantsinlist": listitems
  //     })
  //   })
  //     .then(res => res.text())
  //     .then(res => this.shareList(res))
  // }

  shareList = () => {
    this.setState({openDialog: !this.state.openDialog});
    console.log(this.state.openDialog);
    // this.props.history.push('/blabla')

  }

  render() {

    const list = this.props.favoritesList;
    const items = list.map(result => <FavoriteRestaurant list={this.state.listId} key={result.id} restaurant={result} removeFromList={this.props.removeFromList}/>);

    return (
      <div className="list-wrapper">

      {/* <Dialog onClose={this.handleClose} show={this.state.openDialog}>
        <div className="modal-container">
          <h1>Example Title</h1>
        </div>
      </Dialog> */}

      <Modal show={this.state.openDialog} onClose={this.shareList} listId={this.state.listId}>
        Here's my modal
      </Modal>

        <div className="list-input">
          <input type="text" className="list-details" placeholder="Edit List Title" name="list-title" value={this.state.listTitle} onChange={evt => this.updateTitle(evt)}/>
          <input type="text" className="list-details" placeholder="Edit List Details" name="list-details" value={this.state.listDescription} onChange={evt => this.updateDescription(evt)}/>
        </div>
        {items}
        <Link to='/blahblah'>
          <button className="save-list" onClick={this.shareList}>Share List</button>
        </Link>
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
