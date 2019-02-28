import React from 'react';

const FavoriteRestaurant = ({restaurant, removeFromList}) => {
  
  const removeRestaurant = () => {
    const restaurantId = restaurant.uid;
    removeFromList(restaurantId);
  }

    return (
      <div className="favorite-restaurant">
        <img src={restaurant.image_url} className="favorite-icon" alt="favorite-restaurant"/>
        <div className="favorite-title">{restaurant.name}</div>
        <div className="favorite-rating">{restaurant.rating}</div>
        <div className="favorite-reviewcount">{restaurant.review_count}</div>
        <a href={restaurant.url} className="favorite-url">View More</a>
        <button className="deleteResult" onClick={removeRestaurant}>Remove</button>
      </div>
    )
  }

  export default FavoriteRestaurant;




