import React from 'react';
import emoji from './../assets/emoji-icon.png';


const SharedRestaurant = ({restaurant, reloadScore, list, username}) => {
  
  let voted = false;
  let emoji = null;

  const url = 'http://sues-macbook-pro.local:3001';

  const toggleVote = (restaurant) => {
    voted = !voted;
    console.log(voted, 'you voted!');
    
    if (voted) {
      emoji = <img src={emoji} alt="emoji"/>
    }

    if (voted) {
      fetch(`${url}/addvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "listId": list,
          "restaurantId": restaurant.id,
          "username": username
        })
      })
    } else {
      fetch(`${url}/removevote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "listId": list,
          "restaurantId": restaurant.id,
          "username": username
        })
      })
    }
  }

  return (
    <div className="favorite-restaurant">
      <div className="favorite-left">
        <img src={restaurant.image_url} className="favorite-photo" alt="favorite-restaurant"/>
      </div>
      <div className="favorite-main">
        <div className="favorite-title">{restaurant.name}<span className="favorite-price">({restaurant.price})</span></div>
        <p></p>
        <a href={restaurant.url} className="favorite-url">View More</a>
      </div>
      <div className="favorite-right">
        <div className="favorite-rating">Review Score: {restaurant.rating} <span className="favorite-reviewcount">Reviewed by: {restaurant.review_count} People</span></div>
        
        
        <p id="current-votes">{restaurant.score} Yums </p>

        {emoji}

        <button className="like-restaurant" onClick={() => toggleVote(restaurant)}>ADD YUM</button>
      </div>
    </div>

  )
}

export default SharedRestaurant;


