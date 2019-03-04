import React from 'react';

const SharedRestaurant = ({restaurant, reloadScore, list}) => {
  
  let voted = false;

  const toggleVote = (restaurant) => {
    const listId = list;
    const restaurantId = restaurant.id;
    voted = !voted;
    console.log(voted);

    fetch(`http://localhost:3001/${listId}/${restaurantId}/${voted}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "resturantId": restaurantId
      })
    })

    // TODO: With response, call reducers to update the view
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

        <button className="like-restaurant" onClick={() => toggleVote(restaurant)}>ADD YUM</button>
      </div>
    </div>

  )
}

export default SharedRestaurant;


