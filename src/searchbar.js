import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  searchRestaurants = (userInput) => {
    // post userInput to search
  }

  handleChange = (e) => {
    const userInput = e.target.value;
    this.setState({searchTerm: userInput});
    this.searchRestaurants(userInput);
  }

  render() {
    return (
      <div className="search-fields">
        <input type="text" id="restaurant-search" placeholder="Search restaurants" onChange={this.handleChange}/>
        <div class="location">
          <p className="current-location">Barcelona, ES</p>
          <p className="change-location">Change Location</p>
        </div>
      </div>
    )

  }

}

export default Searchbar;