import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {DebounceInput} from 'react-debounce-input';
import SearchList from './searchlist';
import { connect } from 'react-redux';
import { updateSearchResults, addToList } from './actions.js';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }
  }

  searchRestaurants = (userInput) => {
    const searchTerm = {
      "term": userInput,
      "categories": "restaurants, bars, food",
      "location": "barcelona, spain",
      "limit": 5
    }

    fetch('http://localhost:3001/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchTerm),
    })
      .then(res => res.json())
      .then(res => {
        this.props.updateSearchResults(res);
        console.log('search results', this.props.searchList);
      });
  }

  handleChange = (e) => {
    const userInput = e.target.value;
    this.setState({searchTerm: userInput});
    this.searchRestaurants(userInput);
  }

  render() {
    return (
      <div className="search-fields">
        <DebounceInput minLength={3} type="text" id="restaurant-search" placeholder="Search restaurants" onChange={this.handleChange}/>
        <SearchList results={this.props.searchList} /> 
        <div className="location">
          <p className="current-location">Barcelona, ES</p>
          <p className="change-location">Change Location</p>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  searchList: state.searchList,
  favoritesList: state.favoritesList
})

const mapDispatchToProps = (dispatch) => ({
  updateSearchResults: (results) => dispatch(updateSearchResults(results)),
  addToList: (restaurant) => dispatch(addToList(restaurant)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
