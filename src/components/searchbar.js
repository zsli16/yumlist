import React, { Component } from 'react';
import SearchList from './searchlist';
import { connect } from 'react-redux';
import { updateSearchResults } from '../actions.js';
import logo from './../assets/yumlist-logo.png';

class Searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 50) {
      this.shrinkHeader();
    } else {
      this.growHeader();
    }
  }

  shrinkHeader = () => {
    document.querySelector('.yumlist-logo').style.display = 'none';
    document.querySelector('.location').style.display = 'none';
    document.querySelector('.search-fields').style.height = '15vh';
  }

  growHeader = () => {
    document.querySelector('.yumlist-logo').style.display = 'block';
    document.querySelector('.location').style.display = 'flex';
    document.querySelector('.search-fields').style.height = '30vh';

  }


  searchRestaurants = (userInput) => {
    const url = 'http://localhost:3001';
    this.props.updateSearchResults([]);

    const searchTerm = {
      "term": userInput,
      "categories": "restaurants, bars, food",
      "location": this.props.location,
      "sort_by": "best_match",
      "limit": 5
    }

    fetch(`${url}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchTerm),
    })
      .then(res => res.json())
      .then(res => {
        this.props.updateSearchResults(res);
      });
  }

  returnHome = () => {
    this.props.history.push('/create');
  }

  handleChange = (e) => {

    this.setState({searchTerm: e.target.value}, () => {
      if (this.state.searchTerm.length === 0) this.props.updateSearchResults([]);
      else this.throttleSearch(this.searchRestaurants(this.state.searchTerm), 2000);
    })
  }

  throttleSearch = (func, wait) => {
    let lastTime = 0;
    let lastResult; // should return the last computed result when throttled
    return function throttled () {
      let timeSinceLastRun = Date.now() - lastTime;
      if (timeSinceLastRun >= wait) {
        lastResult = func.apply(this, arguments);
        lastTime = Date.now();
      }
      console.log('lastResult', lastResult);
      return lastResult;
    };
  };

  handleBackspace = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) this.props.updateSearchResults([])
  }

  handleSearchBar = () => {
    if (this.props.searchList.length===0 || this.state.searchTerm === '') {
      return (
        <div>
          <div className="location">
            <p className="current-location">{this.props.location}</p>
            <p className="change-location">Change Location</p>
          </div>
          {/* Add blanck element so that results do not move searchBar */}
          <div className="blankDiv"></div>
        </div>
        )
    } else {
      return (
      <div>
        <SearchList results={this.props.searchList} />
        {/* Add blanck element so results do not move */}
        <div className="blankDiv"></div>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="search-fields">
        <img src={logo} alt="Logo" className="yumlist-logo" onClick={this.returnHome}/>
        <input type="text" onKeyDown={this.handleBackspace} autoComplete="off" id="restaurant-search" placeholder="Search restaurants" value={this.state.searchInput} onChange={this.handleChange}/>
        {this.handleSearchBar()}
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
})

const ConnectedSearchbar = connect(mapStateToProps, mapDispatchToProps)(Searchbar);
export { ConnectedSearchbar, Searchbar };
