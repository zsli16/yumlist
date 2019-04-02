import React, { Component } from 'react';
import squarelogo from '../assets/Square Icon - V2.png';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return(
        <div className="hero-image">
        <div className="hero-content">
          <img className="square-logo" src={squarelogo} alt="logo" width="100px"/>
          <p>Where should we eat?</p>
        </div>
        <div className="home-content">
          <h1>How It Works</h1>
          <h4>Search for restaurants in your town, and share lists with your friends. <br/>They can vote on their favoites by giving YUMS! It's free, and there's no registration needed.</h4>
          <h1>Get Started</h1>
          <Link to="/list">Create New List</Link>
          <p>Did you make a Yumlist already? Click here to check the votes so far!</p>
          <Link to={{pathname: '/list', state: {mode: 'find'}}}>Find My Yumlist</Link>
        </div>
      </div>
    )
  }
}

export default Home