import React, { Component } from 'react';
import squarelogo from '../assets/Square Icon - V2.png';
import { Link } from 'react-router-dom';
import Find from '../assets/find-yumlist.png';
import Create from '../assets/create-yumlist.png';

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
              <p>Search for the best restaurants in your city, and share lists with your friends.</p>
              <br></br>
              <p>They can vote on their favorites by clicking on the YUMS!</p>
                <div><p id="yelp-label">YUMLIST IS POWERED BY:</p></div>
                <div>
                  <img id="yelp-logo" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/styleguide/b62d62e8722a/assets/img/brand_guidelines/yelp_fullcolor_outline@2x.png"
                  />
                </div>
            </div>
            <div>
              <h1 id="get-started">Get Started</h1>
              <p align="center">It's free and there's no registration needed. Just remember the name of your Yumlist!</p>
              <div className="get-started">
                
                <div className="get-started-option">
                  <Link to="/list"><img src={Create} className="illustration"/></Link>
                  <Link to="/list" className="home-button"><span role="img" aria-label="search">📝</span> Create New List</Link>
                </div>
                
                <div className="get-started-option"><h2>OR</h2></div>
                
                <div className="get-started-option">
                  <Link to={{pathname: '/list', state: {mode: 'find'}}}><img src={Find} className="illustration"/></Link>
                  <Link className="home-button" to={{pathname: '/list', state: {mode: 'find'}}}><span role="img" aria-label="search">🔎</span> Find My List</Link>
                </div>
              
              </div>
              
            </div>
       
          </div>
      </div>
    )
  }
}

export default Home