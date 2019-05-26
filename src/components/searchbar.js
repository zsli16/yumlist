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
    if (window.scrollY > 10) {
      this.shrinkHeader();
    } else {
      this.growHeader();
    }
  }

  shrinkHeader = () => {
    document.querySelector('.yumlist-logo').style.display = 'none';
    document.querySelector('.location').style.display = 'none';
  }

  growHeader = () => {
    document.querySelector('.yumlist-logo').style.display = 'block';
    document.querySelector('.location').style.display = 'flex';
  }

  searchRestaurants = (userInput) => {
    const url = `${process.env.REACT_APP_SERVER}`;
    this.props.updateSearchResults([]);

    const searchTerm = {
      "term": userInput,
      "categories": "restaurants, bars, food",
      "location": this.props.location,
      "sort_by": "best_match",
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
        if (res.statusCode === 429) {
          res = {}
        } else {
          this.props.updateSearchResults(res);
        }
      });
  }

  returnHome = () => {
    this.props.history.push('/home');
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value}, () => {
      if (this.state.searchTerm.length === 0) this.props.updateSearchResults([]);
      else this.throttleSearch(this.searchRestaurants(this.state.searchTerm), 1000);
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
      return lastResult;
    };
  };

  handleFocus = (e) => {
    this.searchRestaurants(this.state.searchTerm);
    if (e.keyCode === 8 || e.keyCode === 46) this.props.updateSearchResults([])
  }

  handleSearchBar = () => {
    if (this.props.searchList.length===0 || this.state.searchTerm === '') {
      return (
        <div className="search-fields-container">
          <div className="location">
            <p className="current-location">{this.props.location}</p>
            <p className="change-location">Change Location</p>
          </div>
        </div>
        )
    } else {
      return (
      <div className="search-fields-container">
        <SearchList updateResults={(e) => this.handleChange(e)} results={this.props.searchList} />
      </div>
      )
    }
  }

  render() {
    return (
      <div className="search-fields">
        <img src={logo} alt="Logo" className="yumlist-logo" onClick={this.returnHome}/>
        <input type="text" onFocus={this.handleFocus} onKeyDown={this.handleFocus} autoComplete="off" id="restaurant-search" placeholder="Search by name or category (ex: pizza, sushi)" value={this.state.searchInput} onChange={this.handleChange}/>
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
