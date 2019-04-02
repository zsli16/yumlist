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
            <div className="how-it-works">
              <h1>How It Works</h1>
              <h4>Search for restaurants in your town, and share lists with your friends. <br/>They can vote on their favorites by giving YUMS! <p id="its-free">It's free, and there's no registration needed.</p></h4>
            </div>
            <h1 id="get-started">Get Started</h1>
            <div className="get-started">
            
              
                <Link to="/list" className="home-button">Create New List</Link>
              
             
                <p>Have you made a list already? Check the votes so far!</p>
                <Link className="find-list" to={{pathname: '/list', state: {mode: 'find'}}}><span role="img" aria-label="search">🔎</span>Find My List</Link>
              </div>
       
            
          </div>
      </div>
    )
  }
}

export default Home